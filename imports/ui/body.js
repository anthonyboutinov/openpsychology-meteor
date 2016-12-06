import './body.html';

/*
 * Events for body work a bit differently.
 * Here is a n example:

  "click .btn": function(e, data, tpl) {
    // e -> jquery event
    // data -> Blaze data context of the DOM element triggering the event handler
    // tpl -> the parent template instance for the target element
  }

 */

Template.body.events({
  "focus .form-group-contemporary .form-control": function(event, data, template){
    $(event.target).parents(".form-group-contemporary").addClass("focused");
  },
  "blur .form-group-contemporary .form-control": function(event, data, template){
    $(event.target).parents(".form-group-contemporary").removeClass("focused");
  },
});
