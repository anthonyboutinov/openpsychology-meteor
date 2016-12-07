import './update.html';

import * as selectAllText from '/imports/ui/selectAllText.js';

function makeCall(template) {
  const target = $("[data-id='contenteditableField']");
  const val = target.text();
  if (val && val != template.data.placeholder) {
    Meteor.call(template.data.meteorCallName, val, function(error, result) {
      console.log(error, result);
      if (result) {
        template.data.state.set('storedValue', false);
        console.log(Meteor.user().profile.name);
      }
    });
  }
}

Template.contenteditableUpdate.helpers({
  valueOrPlaceholder() {
    return this.value ? this.value : this.placeholder;
  },
});

Template.contenteditableUpdate.events({
  "keydown [data-id='contenteditableField']": function(event, template) {
    if (event.keyCode != 13) return;
    // const target = $(event.target);
    event.preventDefault();
    makeCall(template);
    // target.text(target.html().replace("<br>", ""));
  },

  "blur [data-id='contenteditableField']": function(event, template) {
    const target = $(event.target);
    const val = target.text();
    if (val != "" && val != template.data.placeholder && val != template.data.state.get('storedValue')) {
      $("[data-id='contenteditableConfirmButton']").removeClass("hidden");
    } else {
      $("[data-id='contenteditableConfirmButton']").addClass("hidden");
      template.data.state.set('storedValue', false);
    }
  },

  "click [data-id='contenteditableConfirmButton']": function(event, template) {
    makeCall(template);
  },
});

Template.contenteditableUpdate.onRendered(function() {

  $("[data-id='contenteditableField']").on("focus", function(event) {
    selectAllText._(event.target);
  }).focus();

});
