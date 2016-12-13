// import { QUERY_LIMIT } from '/imports/startup/client/routes';

let QUERY_LIMIT = 6 * 5;

import './organizer.html';

Template.organizer.helpers({
  formatedDate(date) {
    return moment(date).format('llll');
  },
  calenderDate(date) {
    return moment(date).calendar();
  },

  animationClass(index) {
    return index > QUERY_LIMIT ? "animated fadeIn" : false;
  },

  hasContactInformation() {
    const organizer = this.organizer;
    return organizer.socialLinkVK != null ||
           organizer.socialLinkFacebook != null ||
           organizer.socialLinkOdnoklassniki != null ||
           organizer.socialLinkYouTube != null ||
           organizer.socialLinkTwitter != null ||
           organizer.phoneNum != null ||
           organizer.email != null;
  },
});
