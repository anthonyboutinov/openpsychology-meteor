import { Mongo } from 'meteor/mongo';
import { OrganizersSchema } from './schema.js';
import { Events } from '/imports/api/events/collection.js';
import { Coaches } from '/imports/api/coaches/collection.js';

Organizer = function (doc) {
  _.extend(this, doc);
};

Organizer.prototype = {
  constructor: Organizer,

  /*
   * Base
   */
  events() {
    return Events.find({organizerId: this._id}, {sort: {'dates.dateFrom': -1}});
  },

  coaches() {
    return Coaches.find({organizerId: this._id}, {sort: {'name': 1}});
  },

  managedByUser() {
    const userId = Meteor.userId();
    if (!userId) return false;
    return this.ownerId == userId || this.managedBy.includes(userId);
  },

  /*
   * Social links URLs
   */
  socialLinkVKAbsoluteURL() {
    return "https://vk.com/" + this.socialLinkVK;
  },
  socialLinkOdnoklassnikiAbsoluteURL() {
    return "https://ok.ru/" + this.socialLinkOdnoklassniki;
  },
  socialLinkFacebookAbsoluteURL() {
    return "https://facebook.com/" + this.socialLinkFacebook;
  },
  socialLinkYouTubeAbsoluteURL() {
    return "https://youtube.ru/" + this.socialLinkYouTube;
  },
  socialLinkTwitterAbsoluteURL() {
    return "https://twitter.ru/" + this.socialLinkTwitter;
  },

  /*
   * Location
   */
  locationLabel() {
    return this.location.city + (this.location.line1 ? ", " + this.location.line1 : "") + (this.location.additionalInfo ? ", " + this.location.additionalInfo : "");
  },

  /*
   * Images
   */
  imageFile() {
    return this.imageId ? Images.findOne(this.imageId) : false;
  },
  imageLink() {
    const file = this.imageFile();
    return file ? file.link() : "https://placehold.it/40x40?text=NA";
  },

  bannerFile() {
    return this.bannerImageId ? Images.findOne(this.bannerImageId) : false;
  },
  bannerLink() {
    const file = this.bannerFile();
    return file ? file.link() : '/assets/green.jpg';// "https://placehold.it/700x400?text=" + this.name;
  },
};

export const Organizers = new Mongo.Collection("organizers", {
  transform: function(doc) {
    return new Organizer(doc);
  }
});

Organizers.attachSchema(OrganizersSchema);
Organizers.attachBehaviour('timestampable');
