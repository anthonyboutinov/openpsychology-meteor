import { Mongo } from 'meteor/mongo';
import { EventsSchema } from './schema.js';
import { Categories } from '../categories';
import { Coaches } from '/imports/api/coaches/collection.js';

Event = function (doc) {
  _.extend(this, doc);
};

Event.prototype = {
  constructor: Event,

  /*
   * Basics
   */
  remove(handler) {
    Meteor.call('event.remove', this._id, handler);
  },

  category() {
    return Categories.findOne(this.categoryId);
  },

  coaches() {
    return Coaches.find({_id: {$in: this.coaches}}, {orderBy: {name: 1}});
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
    Meteor.call('event.like', this._id);
  },

  unlike() {
    Meteor.call('event.unlike', this._id);
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
    Meteor.call('event.bookmark', this._id);
  },

  removeBookmark() {
    Meteor.call('event.removeBookmark', this._id);
  },





  locationLabel() {
    return this.location.city + (this.location.line1 ? ", " + this.location.line1 : "") + (this.location.additionalInfo ? ", " + this.location.additionalInfo : "");
  },
  salePriceLabel() {
    const price = this.price.sale;
    return price == 0 ? "Бесплатно" : price + "₽";
  },
  regularPriceLabel() {
    const price = this.price.regular;
    if (price === undefined) return "";
    return price == 0 ? "Бесплатно" : price + "₽";
  },
  deltaPriceLabel() {
    const sale = this.price.sale;
    const regular = this.price.regular;
    return (regular - sale) + "₽";
  },
  salePriceIsSet() {
    return this.price.sale != null && this.price.sale !== this.price.regular;
  },
  registrationIsOpen() {
    return this.dates[this.dates.length - 1].dateFrom > new Date();
  },
  currentUserHasRegistered() {
    const user = Meteor.user();
    return user ? this.registeredForEvent.includes(user._id) : false;
  },

};

export const Events = new Mongo.Collection("events", {
  transform: function(doc) {
    return new Event(doc);
  }
});

Events.attachSchema(EventsSchema);
Events.attachBehaviour('timestampable');
