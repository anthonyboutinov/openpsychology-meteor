import './settings.html';

import * as formControlFunctions from '/imports/ui/formControlFunctions.js';

Template.dashboardSettings.helpers({
  currentUserDoc() {
    return Meteor.user();
  }
});

Template.dashboardSettings.events({

});

Template.dashboardSettings.onRendered(function(){

  $('select:not([data-minimumResultsForSearch="Infinity"])').select2({
    theme: "contemporary",
  }).on("select2:open", function(event) {
    let target = $(event.target);
    formControlFunctions.focus(target);
  }).on("select2:close", function(event) {
    let target = $(event.target);
    formControlFunctions.blur(target);
  });

  $('select[data-minimumResultsForSearch="Infinity"]').select2({
    theme: "contemporary",
    minimumResultsForSearch: Infinity,
  }).on("select2:open", function(event) {
    let target = $(event.target);
    formControlFunctions.focus(target);
  }).on("select2:close", function(event) {
    let target = $(event.target);
    formControlFunctions.blur(target);
  });

});
