import { Mongo } from 'meteor/mongo';
import { EventsSchema } from './schema.js';
import { Categories } from '../categories';

Event = function (doc) {
  _.extend(this, doc);
};

Event.prototype = {
  constructor: Event,

  /*
   * Remove
   */
   remove() {
     return Meteor.call('event.remove', this._id);
   },

  /*
   * Like functionality
   */

  userLikedIt() {
    let user = Meteor.user();
    if (!user || !this.likes) return false;
    return _.pluck(this.likes, 'userId').includes(user._id);
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
   * Bookmark functionality
   */

  userBookmarkedIt() {
    let user = Meteor.user();
    if (!user || !this.bookmarks) return false;
    return _.pluck(this.bookmarks, 'userId').includes(user._id);
  },

  bookmark() {
    return Meteor.call('event.bookmark', this._id);
  },

  removeBookmark() {
    return Meteor.call('event.removeBookmark', this._id);
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
Events.attachBehaviour('timestampable');
