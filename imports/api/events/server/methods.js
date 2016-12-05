import { check } from 'meteor/check';
import { Events } from '../collection.js';

if (Meteor.isServer) {

  Meteor.methods({
    'event.registerForEvent'(eventId, setRegistered) {
      check(eventId, String);
      check(setRegistered, Boolean);

      if (setRegistered) {
        Events.update(eventId, { $push: { registeredForEvent: this.userId} });
      } else {
        Events.update(eventId, { $pull: { registeredForEvent: this.userId} });
      }
    },
  });

}
