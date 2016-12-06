import { Mongo } from 'meteor/mongo';
import { EventsSchema } from './schema.js';
import { Categories } from '../categories';

Event = function (doc) {
  _.extend(this, doc);
};

Event.prototype = {
  constructor: Event,

  /*
   * Like functionality
   */

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
  },


  /*
   * Category functionality
   */

  category() {
    return Categories.findOne({_id: this.categoryId});
  }

};

export const Events = new Mongo.Collection("events", {
  transform: function(doc) {
    return new Event(doc);
  }
});

Events.attachSchema(EventsSchema);
