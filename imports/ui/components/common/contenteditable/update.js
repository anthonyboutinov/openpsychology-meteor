import './update.html';

import * as selectAllText from '/imports/ui/selectAllText.js';

Template.contenteditableUpdate.helpers({
});

Template.contenteditableUpdate.events({
  "keyup #contenteditableField": function(event, template) {
    if (event.keyCode != 13) return;
    const target = $(event.target);
    target.text(target.html().replace("<br>", ""));
  },
  "blur #contenteditableField": function(event, template) {
    const target = $(event.target);
    const val = target.text();
    if (val != "" && val != template.data.placeholder) {
      $("#contenteditableConfirmButton").removeClass("hidden");
    } else {
      $("#contenteditableConfirmButton").addClass("hidden");
    }
  },
  "click #contenteditableConfirmButton": function(event, template) {
    const target = $("#contenteditableField");
    const val = target.text();
    if (val != "" && val != template.data.placeholder) {
      Meteor.call(template.data.meteorCallName, val, function(error, result) {
        console.log(error, result);
      });
    }
  },
});

Template.contenteditableUpdate.onRendered(function() {

  $("#contenteditableField").on("focus", function(event) {
    selectAllText._(event.target);
  }).focus();

});
