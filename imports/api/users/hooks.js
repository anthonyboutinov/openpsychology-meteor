import { Organizers } from '/imports/api/organizers/collection.js';

Meteor.users.after.remove(function (userId, doc) {
  Organizers.remove({ownerId: userId});
});
