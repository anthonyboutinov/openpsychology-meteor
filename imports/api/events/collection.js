import { Mongo } from 'meteor/mongo';
import { EventsSchema } from './schema.js';

Event = function (doc) {
  _.extend(this, doc);
};

Event.prototype = {
  constructor: Event,

  userLikedIt() {
    let userId = Meteor.user()._id;
    if (!userId) {
      return false;
    }
    return this.likes.map(function(like) { return like.userId; }).includes(userId);
  },

  like() {
    return Meteor.call('event.like', this._id);
  },

  unlike() {
    return Meteor.call('event.unlike', this._id);
  },

  likesCount() {
    return this.likes.length;
  }

};

export const Events = new Mongo.Collection("events", {
  transform: function(doc) {
    return new Event(doc);
  }
});

Events.attachSchema(EventsSchema);
