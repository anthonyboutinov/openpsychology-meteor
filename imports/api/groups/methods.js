if (Meteor.isServer) {

  import { check } from 'meteor/check';
  import { Groups } from './collection.js';
  // import { Organizers } from '/imports/api/organizers/collection.js';

  Meteor.methods({

    'event.addToGroup'(eventId, groupId) {
      check(eventId, String);
      check(this.userId, String);
      // TODO: Check if admin

      console.log("event.addToGroup", eventId, groupId);

      const isAlreadyInGroup = _.contains(Groups.findOne(groupId).items, eventId);
      if (isAlreadyInGroup) {
        return false;
      }

      return Groups.update(groupId, { $push: { items: {
        createdAt: new Date(),
        byUserWithId: this.userId,
        item: eventId,
      }} });
    },

    'event.removeFromGroup'(eventId, groupId) {
      check(eventId, String);
      check(this.userId, String);
      // TODO: Check if admin

      console.log("event.removeFromGroup", eventId, groupId);

      return Groups.update(groupId, { $pull: { items: {
        item: eventId
      }} });
    },

  });

}
