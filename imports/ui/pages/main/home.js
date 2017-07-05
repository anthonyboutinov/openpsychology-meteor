import './home.html';
import { Events }      from '/imports/api/events/collection.js';

Template.home.helpers({
  events: function() {
    return Events.find({}, {sort: {'dates.dateFrom': 1}});
  },
});
