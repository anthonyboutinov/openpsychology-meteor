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
});

Template.event.onRendered(function() {
  $('[data-toggle="tooltip"]').tooltip();
});
