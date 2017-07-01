  import { check } from 'meteor/check';
  import { Events } from './collection.js';
  import { Categories } from '/imports/api/categories';
  import { Organizers } from '/imports/api/organizers/collection.js';

  Meteor.methods({

    // @noSecurityChecksRequired
    'event'(eventId) {
      let event = Events.findOne(eventId);
      // TODO: check if these 2 lines are wstill relevant to the project's architecture
      event.category = Categories.findOne(event.categoryId);
      event.organizer = Organizers.findOne(event.organizerId);
      return event;
    },

    // @secure
    'event.remove'(eventId) {
      check(eventId, String);
      Security.can(this.userId).remove(eventId).for(Events).throw();
      return Events.remove(eventId);
      // check(this.userId, String);
      // const managedOrganizers = Organizers.find({
      //   $or: [
      //     {ownerId: this.userId},
      //     {managedBy: this.userId}
      //   ]
      // }, {fields: {_id: 1}}).map(function(doc){return doc._id});
      // return Events.remove({_id: eventId, organizerId: {$in: managedOrganizers}});
    },

    // @secure
    'events.remove'(eventIds) {
      check(eventIds, [String]);
      _.each(eventIds, (eventId)=>{
        Security.can(this.userId).remove(eventId).for(Events).throw();
      });
      return Events.remove({_id: {$in: eventIds}});
      // check(this.userId, String);
      // const managedOrganizers = Organizers.find({
      //   $or: [
      //     {ownerId: this.userId},
      //     {managedBy: this.userId}
      //   ]
      // }, {fields: {_id: 1}}).map(function(doc){return doc._id});
      // return Events.remove({_id: {$in: eventIds}, organizerId: {$in: managedOrganizers}});
    },

    // @secure
    'event.registerForEvent'(eventId, setRegistered, userId = this.userId) {
      check(eventId, String);
      check(setRegistered, Boolean);
      check(userId, String);
      Security.can(this.userId).update(eventId).for(Events).throw();

      if (setRegistered) {
        return Events.update(eventId, { $push: { registeredForEvent: userId} });
      } else {
        return Events.update(eventId, { $pull: { registeredForEvent: userId} });
      }
    },

    // @secure
    'event.like'(eventId) {
      check(eventId, String);
      // check(this.userId, String);
      Security.can(this.userId).update(eventId).for(Events).throw();
      return Events.update(eventId, { $push: { likes: {createdAt: new Date(), userId: this.userId}} });
    },

    // @secure
    'event.unlike'(eventId) {
      check(eventId, String);
      // check(this.userId, String);
      Security.can(this.userId).update(eventId).for(Events).throw();
      return Events.update(eventId, { $pull: { likes: {userId: this.userId}} });
    },

    // @secure
    'event.bookmark'(eventId) {
      check(eventId, String);
      // check(this.userId, String);
      Security.can(this.userId).update(eventId).for(Events).throw();
      return Events.update(eventId, { $push: { bookmarks: {createdAt: new Date(), userId: this.userId}} });
    },

    // @secure
    'event.removeBookmark'(eventId) {
      check(eventId, String);
      // check(this.userId, String);
      Security.can(this.userId).update(eventId).for(Events).throw();
      return Events.update(eventId, { $pull: { bookmarks: {userId: this.userId}} });
    },

    // @secure
    'event.toggleBooking'(eventId, bookingOpen) {
      check(eventId, String);
      check(bookingOpen, Boolean);
      // check(this.userId, String);
      Security.can(this.userId).update(eventId).for(Events).throw();
      return Events.update({_id: eventId}, {$set: {bookingOpen: bookingOpen}});
      // const managedOrganizers = Organizers.find({
      //   $or: [
      //     {ownerId: this.userId},
      //     {managedBy: this.userId}
      //   ]
      // }, {fields: {_id: 1}}).map(function(doc){return doc._id});
      // return Events.update({_id: eventId, organizerId: {$in: managedOrganizers}}, {$set: {bookingOpen: bookingOpen}});
    },

  });
