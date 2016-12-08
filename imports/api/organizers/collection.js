import { Mongo } from 'meteor/mongo';
import { OrganizersSchema } from './schema.js';
import { Events } from '../events/collection.js';

Organizer = function (doc) {
  _.extend(this, doc);
};

Organizer.prototype = {
  constructor: Organizer,

  events() {
    return Events.find({organizerId: this.organizerId}, {orderBy: {'dates.dateFrom': -1}});
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
