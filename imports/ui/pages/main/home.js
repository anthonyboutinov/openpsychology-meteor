import './home.html';
import { Events }      from '/imports/api/events/collection.js';

Template.home.helpers({
  loopCount: function(count) {
    var countArr = [];
    for (var i=0; i<count; i++){
      countArr.push({});
    }
    return countArr;
  },

  events: function() {
    return Events.find({}, {sort: {'dates.dateFrom': 1}});
  },

});
