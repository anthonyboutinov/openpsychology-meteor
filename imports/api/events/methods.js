if (Meteor.isServer) {

  import { check } from 'meteor/check';
  import { Events } from './collection.js';
  import { Categories } from '/imports/api/categories';
  import { Organizers } from '/imports/api/organizers/collection.js';

  Meteor.methods({

    'event'(eventId) {
      let event = Events.findOne(eventId);
      event.category = Categories.findOne(event.categoryId);
      event.organizer = Organizers.findOne(event.organizerId);
      return event;
    },

    'event.remove'(eventId) {
      check(eventId, String);
      check(this.userId, String);
      const managedOrganizers = Organizers.find({
        $or: [
          {ownerId: this.userId},
          {managedBy: this.userId}
        ]
      }, {fields: {_id: 1}}).map(function(doc){return doc._id});
      return Events.remove({_id: eventId, organizerId: {$in: managedOrganizers}});
    },

    'events.remove'(eventIds) {
      check(eventIds, Array);
      check(this.userId, String);
      const managedOrganizers = Organizers.find({
        $or: [
          {ownerId: this.userId},
          {managedBy: this.userId}
        ]
      }, {fields: {_id: 1}}).map(function(doc){return doc._id});
      return Events.remove({_id: {$in: eventIds}, organizerId: {$in: managedOrganizers}});
    },

    'event.registerForEvent'(eventId, setRegistered, userId = this.userId) {
      check(eventId, String);
      check(setRegistered, Boolean);
      check(userId, String);

      if (setRegistered) {
        return Events.update(eventId, { $push: { registeredForEvent: userId} });
      } else {
        return Events.update(eventId, { $pull: { registeredForEvent: userId} });
      }
    },

    'event.like'(eventId) {
      check(eventId, String);
      check(this.userId, String);
      return Events.update(eventId, { $push: { likes: {createdAt: new Date(), userId: this.userId}} });
    },

    'event.unlike'(eventId) {
      check(eventId, String);
      check(this.userId, String);
      return Events.update(eventId, { $pull: { likes: {userId: this.userId}} });
    },

    'event.bookmark'(eventId) {
      check(eventId, String);
      check(this.userId, String);
      return Events.update(eventId, { $push: { bookmarks: {createdAt: new Date(), userId: this.userId}} });
    },

    'event.removeBookmark'(eventId) {
      check(eventId, String);
      check(this.userId, String);
      return Events.update(eventId, { $pull: { bookmarks: {userId: this.userId}} });
    },

  });
}
