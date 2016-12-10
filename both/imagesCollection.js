import { FilesCollection } from 'meteor/ostrio:files';

this.Images = new FilesCollection({
  collectionName: 'Images',
  allowClientCode: true, // Disallow remove files from Client,
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.ext)) {
      return true;
    } else {
      return 'Пожалуйста, загружайте изображения размером не больше 10МБ!';
    }
  },

  storagePath() {
    return "/Volumes/dev-op-meteor-files.esy.es/";
    // return '/data/Meteor/uploads/openpsychology-meteor/';
  },

  /*
  Time in seconds, during upload may be continued, default 3 hours (10800 seconds)
  If upload is not continued during this time, memory used for this upload will be freed. And uploaded chunks is removed. Server will no longer wait for upload, and if upload will be tied to be continued - Server will return 408 Error (Can't continue upload, session expired. Start upload again.)
  */
  continueUploadTTL: 600, //seconds
});

if (Meteor.isClient) {
  Meteor.subscribe('files.images.all');
}

if (Meteor.isServer) {
  Meteor.publish('files.images.all', function () {
    return Images.collection.find({});
  });

  // Meteor.publish('files.images.organizersManagedBuUser', function() {
  //
  // });

  // Images.allowClient();
}
