import { Coaches } from './collection.js';


Coaches.after.remove(function (userId, doc) {
  UserFiles.remove({_id: doc.profilePicId});
});

// TODO: check if images are automatically removed when updating profile pircure