if (Meteor.isServer) {

  import { check } from 'meteor/check';
  import { Groups } from './collection.js';
  // import { Organizers } from '/imports/api/organizers/collection.js';

  Meteor.methods({

    // @secure
    'event.addToGroup'(eventId, groupId, expiresAt) {
      check(eventId, String);
      check(groupId, String);
      check(expiresAt, Date);

      const modifier = {
        $push: {
          items: {
            createdAt: new Date(),
            byUserWithId: this.userId,
            item: eventId,
            expiresAt: expiresAt
          }
        }
      };
      Security.can(this.userId).update(groupId, modifier).for(Groups).throw();

      const group = Groups.findOne(groupId);
      if (group.refKind != "events") {
        throw new Meteor.Error("group-not-accepting-refKind", "Group you are trying to add to does not accept Event items.");
      }
      const isAlreadyInGroup = _.contains(group.items, eventId);
      if (isAlreadyInGroup) {
        throw new Meteor.Error("group-item-not-unique", "Group you are trying to add to already has this item.");
      }

      return Groups.update(groupId, modifier);
    },

    // @secure
    'event.removeFromGroup'(eventId, groupId) {
      check(eventId, String);

      const modifier = { $pull: { items: { item: eventId } } };
      Security.can(this.userId).update(groupId, modifier).for(Groups).throw();

      return Groups.update(groupId, modifier);
    },

  });

}
