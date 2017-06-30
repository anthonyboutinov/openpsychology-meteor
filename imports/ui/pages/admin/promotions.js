import './promotions.html';

import { Groups } from '/imports/api/groups/collection.js';

Template.adminPromotions.helpers({
  settings() {
    return {
      collection: Groups,
      useFontAwesome:true,
      rowsPerPage:30,
      showRowCount:true,
      showColumnToggles:true,
      enableRegex:true,
    }
  },
});

Template.adminPromotions.events({
  'dblclick .reactive-table tbody tr': function (event) {
    var row = this;
    console.log(row);
  }
});
