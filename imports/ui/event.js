import './calendar-event.html';
import './calendar-event.js';

Template.event.helpers({
  nbsp: function(str) {
    return str.replace(/&nbsp;/g, '\u00a0');
  },

  location: function(location) {
    return location.city + ", " + location.street + ", " + location.building + ", " + location.additionalInfo;
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
    return this.event.price.sale != null;
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
  }
});

Template.event.onRendered(function() {
  this.$('[data-toggle="tooltip"]').tooltip();
});
