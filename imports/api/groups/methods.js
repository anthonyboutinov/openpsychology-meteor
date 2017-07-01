if (Meteor.isServer) {

  import { check } from 'meteor/check';
  import { Groups } from './collection.js';
  // import { Organizers } from '/imports/api/organizers/collection.js';

  Meteor.methods({

    // @secure
    'event.addToGroup'(eventId, groupId) {
      check(eventId, String);

      const modifier = {
        $push: {
          items: {
            createdAt: new Date(),
            byUserWithId: this.userId,
            item: eventId,
          }
        }
      };
      Security.can(this.userId).update(groupId, modifier).for(Groups).throw();

      const isAlreadyInGroup = _.contains(Groups.findOne(groupId).items, eventId);
      if (isAlreadyInGroup) {
        return false;
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
