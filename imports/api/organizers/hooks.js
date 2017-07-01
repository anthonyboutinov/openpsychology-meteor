import { Organizers } from './collection.js';
import { Events } from '/imports/api/events/collection.js';
import { Coaches } from '/imports/api/coaches/collection.js';
import { SystemNotifications } from '/imports/api/systemNotifications.js';

Organizers.after.remove(function (userId, doc) {
  Coaches.remove({organizerId: doc._id});
  Events.remove({organizerId: doc._id});
  UserFiles.remove({_id: {$in: [doc.bannerImageId, doc.imageId]}});
});

Organizers.after.insert(function (userId, doc) {
  const user = Meteor.user();
  if (_.contains(user.appSpecific.systemNotifications, SystemNotifications.showWelcomeNotification)) {
    const modifier = {$pull: {"appSpecific.systemNotifications": SystemNotifications.showWelcomeNotification}};
    Meteor.users.update(userId, modifier);
  }
});
