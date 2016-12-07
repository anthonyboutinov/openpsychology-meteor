import './setupUsernameContenteditable.html';

import * as selectAllText from '/imports/ui/selectAllText.js';

Template.setupUsernameContenteditable.helpers({
});

Template.setupUsernameContenteditable.events({
  "keyup span": function(event, template) {
    if (event.keyCode != 13) return;
    const target = $(event.target);
    target.text(target.html().replace("<br>", ""));
  },
  "blur span": function(event, template) {
    const target = $(event.target);
    const val = target.text();
    if (val != "" && val != "Введите Ваше имя") {
      $("#setupUsernameConfirmButton").removeClass("hidden");
    } else {
      $("#setupUsernameConfirmButton").addClass("hidden");
    }
  },
  "click #setupUsernameConfirmButton": function(event, template) {
    const target = $("#setupUsernameContenteditable");
    const val = target.text();
    if (val != "" && val != "Введите Ваше имя") {
      Meteor.call("user.profile.name.update", val, function(error, result) {
        console.log(error, result);
      });
    }
  },
});

Template.setupUsernameContenteditable.onRendered(function() {

  $("#setupUsernameContenteditable").on("focus", function(event) {
    selectAllText._(event.target);
  }).focus();

});
