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
  "focus .form-group .form-control": function(event, data, template){
    let target = $(event.target);
    target.parents(".form-group").addClass("focused");
  },
  "blur .form-group .form-control": function(event, data, template){
    let target = $(event.target);
    target.parents(".form-group").removeClass("focused");
    if (target.val()) {
      target.parents(".form-group").find("label").addClass("fade");
    } else {
      target.parents(".form-group").find("label").removeClass("fade");
    }
  },
  "click .form-group .input-group-addon": function(event, data, template){
    let target = $(event.target);
    target.parents(".form-group").find("input").focus();
  },
});
