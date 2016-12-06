import { QUERY_LIMIT } from '/imports/startup/client/routes.js';

import './organizer.html';

Template.organizer.helpers({
  formatedDate: function(date) {
    return moment(date).format('llll');
  },
  calenderDate: function(date) {
    return moment(date).calendar();
  },

  animationClass: function(index) {
    return index > QUERY_LIMIT ? "animated fadeIn" : false;
  },
});
