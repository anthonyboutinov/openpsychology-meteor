import { Organizers } from '/imports/api/organizers/collection.js';

Meteor.users.after.remove(function (userId, doc) {
  Organizers.remove({ownerId: userId});
}, {fetchPrevious: false});

// Meteor.users.before.update(function (userId, doc, fieldNames, modifier, options) {
//
// }, {fetchPrevious: false});


Meteor.users.after.update(function (userId, doc, fieldNames, modifier, options) {
  console.log("\n\n----------Meteor.users.after.update--------------\n", {userId, fieldNames, modifier, options});

  // TODO: rm showConfirmEmailNotification after email gets verified
  // const setModifier = modifier['$set'];
  // if (setModifier) {
  //
  // }
  // const user = Meteor.user();
  // if (_.contains(user.appSpecific.systemNotifications, SystemNotifications.showConfirmEmailNotification)) {
  //   const modifier = {$pull: {"appSpecific.systemNotifications": SystemNotifications.showConfirmEmailNotification}};
  //   Meteor.users.update(userId, modifier);
  // }
}, {fetchPrevious: false});
