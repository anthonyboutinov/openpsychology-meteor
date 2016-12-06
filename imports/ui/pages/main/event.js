import './event.html';

import '/imports/ui/components/main/calendar-event.js';

Template.event.helpers({
  location: function(location) {
    return location.city + ", " + location.line1 + ", " + location.additionalInfo;
  },
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

  salePriceExists: function() {
    return this.event.price.sale != null && this.event.price.sale !== this.event.price.regular;
  },
  salePriceLabel: function() {
    const price = this.event.price.sale;
    return price == 0 ? "Бесплатно" : price + "₽";
  },
  regularPriceLabel: function() {
    const price = this.event.price.regular;
    return price == 0 ? "Бесплатно" : price + "₽";
  },
  deltaPrice: function() {
    const sale = this.event.price.sale;
    const regular = this.event.price.regular;
    return (regular - sale) + "₽";
  },
  priceGTZero: function() {
    return this.event.price.regular > 0;
  },

  registrationIsOpen: function() {
    return this.event.dates[this.event.dates.length - 1].dateFrom > new Date();
  },

  registeredForEvent: function() {
    const user = Meteor.user();
    return user && this.event.registeredForEvent ? this.event.registeredForEvent.includes(user._id) : false;
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
