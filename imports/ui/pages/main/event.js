import './event.html';

import '/imports/ui/components/main/calendar-event.js';
import '/imports/ui/components/common/listOfUsers/';
import '/imports/ui/components/admin/addToGroupListItems.js';
import '/imports/ui/components/admin/removeFromGroupListItems.js';

Template.event.helpers({
  showCalEventsCount(count) {
    return count >= 2;
  },
  calEventsCountLabel(count) {
    let ending = "и";
    if (count % 10 >= 5 || count % 10 == 0) {
      ending = "";
    }
    return "Всего " + count + " встреч" + ending;
  },

  showPricingNote() {
    return this.event.price.regular > 0 && this.event.dates.length > 1;
  },

  hasContactInformation() {
    const organizer = this.event.organizer();
    return organizer.socialLinkVK != null ||
           organizer.socialLinkFacebook != null ||
           organizer.socialLinkOdnoklassniki != null ||
           organizer.socialLinkYouTube != null ||
           organizer.socialLinkTwitter != null ||
           organizer.phoneNum != null ||
           organizer.email != null;
  },
});

Template.event.events({
  "click #registerForEvent": function(event, template){
    Meteor.call('event.registerForEvent', template.data.event._id, true);
  },
  "click #unregisterFromEvent": function(event, template){
    Meteor.call('event.registerForEvent', template.data.event._id, false);
  },
});

Template.event.onRendered(function() {
  this.$('[data-toggle="tooltip"]').tooltip();
});
