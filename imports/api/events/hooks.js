import { Events } from './collection.js';


Events.after.remove(function (userId, doc) {
  UserFiles.remove({_id: doc.imageId});
}, {fetchPrevious: false});
