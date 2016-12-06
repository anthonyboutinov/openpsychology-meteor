if (Meteor.isServer) {

  import { check } from 'meteor/check';
  import { Events } from './collection.js';

  Meteor.methods({

    'event.registerForEvent'(eventId, setRegistered) {
      check(eventId, String);
      check(setRegistered, Boolean);
      check(this.userId, String);

      if (setRegistered) {
        Events.update(eventId, { $push: { registeredForEvent: this.userId} });
      } else {
        Events.update(eventId, { $pull: { registeredForEvent: this.userId} });
      }
    },

    'event.like'(eventId) {
      check(eventId, String);
      check(this.userId, String);
      Events.update(eventId, { $push: { likes: {createdAt: new Date(), userId: this.userId}} });
    },

    'event.unlike'(eventId) {
      check(eventId, String);
      check(this.userId, String);
      Events.update(eventId, { $pull: { likes: {userId: this.userId}} });
    }

  });
}
