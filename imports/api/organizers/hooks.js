import { Organizers } from './collection.js';
import { Events } from '/imports/api/events/collection.js';
import { Coaches } from '/imports/api/coaches/collection.js';

Organizers.after.remove(function (userId, doc) {
  Coaches.remove({organizerId: doc._id});
  Events.remove({organizerId: doc._id});
  Images.remove({_id: {$in: [doc.bannerImageId, doc.imageId]}});
});
