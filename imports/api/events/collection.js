import { Mongo } from 'meteor/mongo';
import { EventsSchema } from './schema.js';
import { Categories } from '../categories';
import { Coaches } from '/imports/api/coaches/collection.js';
import { Organizers } from '/imports/api/organizers/collection.js';

Event = function (doc) {
  _.extend(this, doc);
};

Event.prototype = {
  constructor: Event,

  /*
   * Base
   */
  remove(handler) {
    Meteor.call('event.remove', this._id, handler);
  },

  category() {
    return Categories.findOne(this.categoryId);
  },

  organizer() {
    return Organizers.findOne(this.organizerId);
  },

  coaches() {
    return Coaches.find({_id: {$in: this.coachesIds}}, {sort: {name: 1}});
  },

  userManagesThis() {
    const userId = Meteor.userId();
    if (!userId) return false;
    const organizer = Organizers.findOne(this.organizerId, {fields: {managedBy: 1}});
    if (!organizer) return false;
    const managedByUserIds = organizer.managedBy.map((v)=>{return v.userId});
    return managedByUserIds.includes(userId);
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

  /*
   * Location
   */
  locationLabel() {
    return this.location.city + (this.location.line1 ? ", " + this.location.line1 : "") + (this.location.additionalInfo ? ", " + this.location.additionalInfo : "");
  },

  /*
   * Price
   */

  salePriceLabel() {
    const price = this.price.sale;
    if (price === undefined) return null;
    return price == 0 ? "Бесплатно" : price + "₽";
  },
  regularPriceLabel() {
    const price = this.price.regular;
    if (price === undefined) return null;
    return price == 0 ? "Бесплатно" : price + "₽";
  },
  priceLabel() {
    const sale = this.price.sale;
    if (sale != null) {
      return this.salePriceLabel();
    } else {
      return this.regularPriceLabel();
    }
  },
  deltaPriceLabel() {
    const sale = this.price.sale;
    const regular = this.price.regular;
    return (regular - sale) + "₽";
  },
  salePriceIsSet() {
    return this.price.sale != null && this.price.sale !== this.price.regular;
  },

  /*
   * Registration
   */
  registrationIsOpen() {
    return this.dates[this.dates.length - 1].dateFrom > new Date();
  },
  currentUserHasRegistered() {
    const user = Meteor.user();
    return user ? this.registeredForEvent.includes(user._id) : false;
  },

  /*
   * Images
   */
  imageFile() {
    return this.imageId ? Images.findOne(this.imageId) : false;
  },
  imageLink() {
    const file = this.imageFile();
    return file ? file.link() : "https://placehold.it/360x180?text=" + this.title;
  },

  bannerFile() {
    return this.bannerImageId ? Images.findOne(this.bannerImageId) : false;
  },
  bannerLink() {
    const file = this.bannerFile();
    return file ? file.link() :  "https://placehold.it/780x260?text=" + this.title;
  },

};

export const Events = new Mongo.Collection("events", {
  transform: function(doc) {
    return new Event(doc);
  }
});

Events.attachSchema(EventsSchema);
Events.attachBehaviour('timestampable');
