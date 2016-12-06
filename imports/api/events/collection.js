import { Mongo } from 'meteor/mongo';
import { EventsSchema } from './schema.js';

Event = function (doc) {
  _.extend(this, doc);
};

Event.prototype = {
  constructor: Event,

  userLikedIt: function() {
    let userId = Meteor.user()._id;
    if (!userId) {
      return false;
    }
    let a = this.likes.map(function(like) { return like.userId; }).includes(userId);
    console.log("userLikedIt from collection prototype were called with result ", a);
    return a;
  }

};

export const Events = new Mongo.Collection("events", {
  transform: function(doc) {
    return new Event(doc);
  }
});

Events.attachSchema(EventsSchema);
