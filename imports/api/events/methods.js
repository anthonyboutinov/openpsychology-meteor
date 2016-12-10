if (Meteor.isServer) {

  import { check } from 'meteor/check';
  import { Events } from './collection.js';
  import { Categories } from '/imports/api/categories';
  import { Organizers } from '/imports/api/organizers/collection.js';

  Meteor.methods({

    'event'(eventId) {
      let event = Events.findOne(eventId);
      event.category = Categories.findOne(event.categoryId);
      event.organizer = Organizers.findOne(event.organizer._id);
      return event;
    },

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
    },

    'event.bookmark'(eventId) {
      check(eventId, String);
      check(this.userId, String);
      Events.update(eventId, { $push: { bookmarks: {createdAt: new Date(), userId: this.userId}} });
    },

    'event.removeBookmark'(eventId) {
      check(eventId, String);
      check(this.userId, String);
      Events.update(eventId, { $pull: { bookmarks: {userId: this.userId}} });
    },

    'event.remove'(eventId) {
      check(eventId, String);
      check(this.userId, String);
      let organizerId = Events.findOne({_id: eventId}).organizer._id;
      if ( !Organizers.findOne({_id: organizerId}, {managedBy: { userId: this.userId}}) ) {
        // TODO: throw error
        return false;
      }
      Events.remove({_id: eventId});
    },

  });
}
