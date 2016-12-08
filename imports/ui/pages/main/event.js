import './event.html';

import '/imports/ui/components/main/calendar-event.js';

Template.event.helpers({
  showCalEventsCount: function(count) {
    return count >= 2;
  },
  calEventsCountLabel: function(count) {
    let ending = "и";
    if (count % 10 >= 5 || count % 10 == 0) {
      ending = "";
    }
    return "Всего " + count + " встреч" + ending;
  },

  priceGTZero: function() {
    return this.event.price.regular > 0;
  },

  eventBannerUrl: function() {
    return this.event.bannerUrl ? this.event.bannerUrl : "https://placehold.it/800x300?text=" + this.event.title;
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
