import { Coaches } from './collection.js';

Coaches.after.remove(function (userId, doc) {
  Images.remove({_id: doc.profilePicId});
});
