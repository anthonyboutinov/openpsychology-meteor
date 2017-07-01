  import { check } from 'meteor/check';
  import { Events } from './collection.js';
  import { Categories } from '/imports/api/categories';
  import { Organizers } from '/imports/api/organizers/collection.js';

  Meteor.methods({

    // @noSecurityChecksRequired
    'event'(eventId) {
      let event = Events.findOne(eventId);
      // TODO: Q: check if these 2 lines are still relevant to the project's architecture
      //       A: Propably, yes. This speeds things up, but is not reactive which is not really a problem
      event.category = Categories.findOne(event.categoryId);
      event.organizer = Organizers.findOne(event.organizerId);
      return event;
    },

    // @secure
    'event.remove'(eventId) {
      check(eventId, String);
      Security.can(this.userId).remove(eventId).for(Events).throw();
      return Events.remove(eventId);
    },

    // @secure
    'events.remove'(eventIds) {
      check(eventIds, [String]);
      _.each(eventIds, (eventId)=>{
        Security.can(this.userId).remove(eventId).for(Events).throw();
      });
      return Events.remove({_id: {$in: eventIds}});
    },

    // @secure
    'event.registerForEvent'(eventId, setRegistered, userId = this.userId) {
      check(eventId, String);
      check(setRegistered, Boolean);
      check(userId, String);

      let modifier;
      if (setRegistered) {
        modifier = { $push: { registeredForEvent: userId} };
      } else {
        modifier = { $pull: { registeredForEvent: userId} };
      }

      Security.can(this.userId).update(eventId, modifier).for(Events).throw();
      return Events.update(eventId, modifier);
    },

    // @secure
    'event.like'(eventId) {
      check(eventId, String);
      const modifier = { $push: { likes: {createdAt: new Date(), userId: this.userId}} };
      Security.can(this.userId).update(eventId, modifier).for(Events).throw();
      return Events.update(eventId, modifier);
    },

    // @secure
    'event.unlike'(eventId) {
      check(eventId, String);
      const modifier = { $pull: { likes: {userId: this.userId}} };
      Security.can(this.userId).update(eventId, modifier).for(Events).throw();
      return Events.update(eventId, modifier);
    },

    // @secure
    'event.bookmark'(eventId) {
      check(eventId, String);
      const modifier = { $push: { bookmarks: {createdAt: new Date(), userId: this.userId}} };
      Security.can(this.userId).update(eventId, modifier).for(Events).throw();
      return Events.update(eventId, modifier);
    },

    // @secure
    'event.removeBookmark'(eventId) {
      check(eventId, String);
      const modifier = { $pull: { bookmarks: {userId: this.userId}} };
      Security.can(this.userId).update(eventId, modifier).for(Events).throw();
      return Events.update(eventId, modifier);
    },

    // @secure
    'event.toggleBooking'(eventId, bookingOpen) {
      check(eventId, String);
      check(bookingOpen, Boolean);
      const modifier = {$set: {bookingOpen: bookingOpen}};
      Security.can(this.userId).update(eventId, modifier).for(Events).throw();
      return Events.update(eventId, modifier);
    },

  });
