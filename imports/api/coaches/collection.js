import { Mongo } from 'meteor/mongo';
import { CoachesSchema } from './schema.js';
import { Organizers } from '/imports/api/organizers/collection.js';
import { Events } from '/imports/api/events/collection.js';

Coach = function (doc) {
  _.extend(this, doc);
};

Coach.prototype = {
  constructor: Coach,

  /*
   * Base
   */
  organizer() {
    return Organizers.findOne(this.organizerId);
  },

  events() {
    return Events.find({coaches: this._id});
  },

  /*
   * Social links URLs
   */
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
    return "https://youtube.com/" + this.socialLinkYouTube;
  },
  socialLinkTwitterAbsoluteURL: function () {
    return "https://twitter.com/" + this.socialLinkTwitter;
  },

  /*
   * Images
   */
  profilePicFile() {
    return this.profilePicId ? Images.findOne(this.profilePicId) : false;
  },
  profilePicLink() {
    const file = this.profilePicFile();
    return file ? file.link() : "https://placehold.it/48x48?text=NA";
  },

};

export const Coaches = new Mongo.Collection("coaches", {
  transform: function(doc) {
    return new Coach(doc);
  }
});

Coaches.attachSchema(CoachesSchema);
Coaches.attachBehaviour('timestampable');
