import { Mongo } from 'meteor/mongo';
import { OrganizersSchema } from './schema.js';
import { Events } from '/imports/api/events/collection.js';
import { Coaches } from '/imports/api/coaches/collection.js';

Organizer = function (doc) {
  _.extend(this, doc);
};

Organizer.prototype = {
  constructor: Organizer,

  events() {
    return Events.find({'organizer._id': this._id}, {orderBy: {'dates.dateFrom': -1}});
  },

  coaches() {
    return Coaches.find({organizerId: this._id}, {orderBy: {'name': 1}});
  },

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

  imageFile() {
    return this.imageUrl ? Images.findOne(this.imageUrl) : false;
  },
  imageLink() {
    const file = this.imageFile();
    return file ? file.link() : "https://placehold.it/40x40?text=NA";
  },

  bannerFile() {
    return this.bannerUrl ? Images.findOne(this.bannerUrl) : false;
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
