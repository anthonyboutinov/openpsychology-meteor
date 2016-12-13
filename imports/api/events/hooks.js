import { Events } from './collection.js';

Events.after.remove(function (userId, doc) {
  Images.remove({_id: doc.imageId});
});
