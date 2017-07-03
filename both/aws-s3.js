import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';
import { Random } from 'meteor/random';
import stream from 'stream';
import {_app} from './lib/__globals.js';
import S3 from 'aws-sdk/clients/s3'; // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html
// See fs-extra and graceful-fs NPM packages
// For better i/o performance
import fs from 'fs';

let client, s3Conf, bound;

if(Meteor.isServer){

  // Example: S3='{"s3":{"key": "xxx", "secret": "xxx", "bucket": "xxx", "region": "xxx""}}' meteor
  if (process.env.S3) {
    Meteor.settings.s3 = JSON.parse(process.env.S3).s3;
  }

  s3Conf = Meteor.settings.s3 || {};
  bound  = Meteor.bindEnvironment((callback) => {
    return callback();
  });

  // Check settings existence in `Meteor.settings`
  // This is the best practice for app security
  if (s3Conf && s3Conf.key && s3Conf.secret && s3Conf.bucket && s3Conf.region) {
    // Create a new S3 object
    client = new S3({
      secretAccessKey: s3Conf.secret,
      accessKeyId: s3Conf.key,
      region: s3Conf.region,
      // sslEnabled: true, // optional
      httpOptions: {
        timeout: 6000,
        agent: false
      }
    });

  } else {
    throw new Meteor.Error(401, 'Missing Meteor file settings. During development, please use \'meteor --settings ./dev-settings.json\'');
  }
}

const storagePath = Meteor.isDevelopment ? "/data/Meteor/uploads/openpsychology-meteor/" : 'assets/app/uploads/UserFiles';
const bucketStoragePath = Meteor.isDevelopment ? "dev-userfiles" : "userfiles";

// Declare the Meteor file collection on the Server
export const UserFiles = new FilesCollection({
  // debug: true,
  // throttle: false,
  chunkSize: 1024 * 768,
  storagePath: storagePath,
  collectionName: 'UserFiles',
  allowClientCode: true,
  protected(fileObj) {
    if (fileObj) {
      if (!(fileObj.meta && fileObj.meta.secured)) {
        return true;
      } else if ((fileObj.meta && fileObj.meta.secured === true) && this.userId === fileObj.userId) {
        return true;
      }
    }
    return false;
  },
  onBeforeRemove(cursor) {
    const res = cursor.map((file) => {
      if (file && file.userId && _.isString(file.userId)) {
        return file.userId === this.userId;
      }
      return false;
    });
    return !~res.indexOf(false);
  },
  onBeforeUpload() {
    if (this.file.size <= 1024 * 1024 * 3) {
      return true;
    }
    return "Max. file size is 3MB! You've tried to upload " + (filesize(this.file.size));
  },
  downloadCallback(fileObj) {
    if (this.params && this.params.query && this.params.query.download === 'true') {
      UserFiles.collection.update(fileObj._id, {
        $inc: {
          'meta.downloads': 1
        }
      }, _app.NOOP);
    }
    return true;
  },
  interceptDownload(http, fileRef, version) {
    let path;
    path = (fileRef && fileRef.versions && fileRef.versions[version] && fileRef.versions[version].meta && fileRef.versions[version].meta.pipePath) ? fileRef.versions[version].meta.pipePath : void 0;
    if (path) {
      // If file is successfully moved to Storage
      // We will pipe request to Storage
      // So, original link will stay always secure

      // To force ?play and ?download parameters
      // and to keep original file name, content-type,
      // content-disposition and cache-control
      // we're using low-level .serve() method
      const opts = {
        Bucket: s3Conf.bucket,
        Key: path
      };

      if (http.request.headers.range) {
        const vRef  = fileRef.versions[version];
        let range   = _.clone(http.request.headers.range);
        const array = range.split(/bytes=([0-9]*)-([0-9]*)/);
        const start = parseInt(array[1]);
        let end     = parseInt(array[2]);
        if (isNaN(end)) {
          // Request data from AWS:S3 by small chunks
          end       = (start + this.chunkSize) - 1;
          if (end >= vRef.size) {
            end     = vRef.size - 1;
          }
        }
        opts.Range   = `bytes=${start}-${end}`;
        http.request.headers.range = `bytes=${start}-${end}`;
      }

      const fileColl = this;
      client.getObject(opts, function (error) {
        if (error) {
          console.error(error);
          if (!http.response.finished) {
            http.response.end();
          }
        } else {
          if (http.request.headers.range && this.httpResponse.headers['content-range']) {
            // Set proper range header in according to what is returned from AWS:S3
            http.request.headers.range = this.httpResponse.headers['content-range'].split('/')[0].replace('bytes ', 'bytes=');
          }

          const dataStream = new stream.PassThrough();
          fileColl.serve(http, fileRef, fileRef.versions[version], version, dataStream);
          dataStream.end(this.data.Body);
        }
      });

      return true;
    }
    return false;
  }
});

if(Meteor.isServer){

  UserFiles.denyClient();
  UserFiles.on('afterUpload', function(fileRef) {
    sendToStorage = (fileRef) => {
      _.each(fileRef.versions, (vRef, version) => {
        // We use Random.id() instead of real file's _id
        // to secure files from reverse engineering
        // As after viewing this code it will be easy
        // to get access to unlisted and protected files
        const filePath = bucketStoragePath + '/' + (Random.id()) + '-' + version + '.' + fileRef.extension;

        client.putObject({
          StorageClass: 'STANDARD',
          Bucket: s3Conf.bucket,
          Key: filePath,
          Body: fs.createReadStream(vRef.path),
          ContentType: vRef.type,
        }, (error) => {
          bound(() => {
            if (error) {
              console.error(error);
            } else {
              const upd = { $set: {} };
              upd['$set']['versions.' + version + '.meta.pipePath'] = filePath;
              this.collection.update({
                _id: fileRef._id
              }, upd, (updError) => {
                if (updError) {
                  console.error(updError);
                } else {
                  // Unlink original file from FS
                  // after successful upload to AWS:S3
                  this.unlink(this.collection.findOne(fileRef._id), version);
                }
              });
            }
          });
        });
      });
    };

    // if (/png|jpe?g/i.test(fileRef.extension || '')) {
    //   _app.createThumbnails(this, fileRef, (error, fileRef) => {
    //     if (error) {
    //       console.error(error);
    //     }
    //     sendToStorage(this.collection.findOne(fileRef._id));
    //   });
    // } else {
      sendToStorage(fileRef);
    // }
  });

  // This line now commented due to Heroku usage
  // UserFiles.collection._ensureIndex {'meta.expireAt': 1}, {expireAfterSeconds: 0, background: true}

  // Intercept FileCollection's remove method
  // to remove file from DropBox or AWS S3
  const _origRemove = UserFiles.remove;
  UserFiles.remove = function(search) {
    const cursor = this.collection.find(search);
    cursor.forEach((fileRef) => {
      _.each(fileRef.versions, (vRef) => {
        if (vRef && vRef.meta && vRef.meta.pipePath != null) {
          // AWS:S3 usage:
          client.deleteObject({
            Bucket: s3Conf.bucket,
            Key: vRef.meta.pipePath,
          }, (error) => {
            bound(() => {
              if (error) {
                console.error(error);
              }
            });
          });
        }
      });
    });
    // Call original method
    _origRemove.call(this, search);
  };


  // Remove all files on server load/reload, useful while testing/development
  // Meteor.startup -> UserFiles.remove {}

  // Remove files along with MongoDB records two minutes before expiration date
  // If we have 'expireAfterSeconds' index on 'meta.expireAt' field,
  // it won't remove files themselves.
  // Meteor.setInterval(() => {
  //   UserFiles.remove({
  //     'meta.expireAt': {
  //       $lte: new Date(+new Date() + 120000)
  //     }
  //   }, _app.NOOP);
  // }, 120000);

}

this.UserFiles = UserFiles;
