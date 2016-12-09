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
    console.log("o.coaches() called", Coaches.find({organizerId: this._id}, {orderBy: {'name': 1}}).count());
    return Coaches.find({organizerId: this._id}, {orderBy: {'name': 1}});
  },

  socialLinkVKAbsoluteURL: function () {
    return "https://vk.com/" + this.socialLinkVK;
  },
  socialLinkOdnoklassnikiAbsoluteURL: function () {
    return "https://ok.ru/" + this.socialLinkOdnoklassniki;
  },
  socialLinkFacebookAbsoluteURL: function () {
    return "https://facebook.com/" + this.socialLinkFacebook;
  },
  socialLinkYouTubeAbsoluteURL: function () {
    return "https://youtube.ru/" + this.socialLinkYouTube;
  },
  socialLinkTwitterAbsoluteURL: function () {
    return "https://twitter.ru/" + this.socialLinkTwitter;
  },
};

export const Organizers = new Mongo.Collection("organizers", {
  transform: function(doc) {
    return new Organizer(doc);
  }
});

Organizers.attachSchema(OrganizersSchema);
