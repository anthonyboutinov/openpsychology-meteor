import './body.html';
import { FormControlHelperMethods } from '/imports/lib/formControlHelperMethods.js';

/*
 * Events for body work a bit differently.
 * Here is an example:

  "click .btn": function(e, data, tpl) {
    // e -> jquery event
    // data -> Blaze data context of the DOM element triggering the event handler
    // tpl -> the parent template instance for the target element
  }

 */

Template.body.events({
  "focus .form-group .form-control": function(event, data, template){
    let target = $(event.target);
    FormControlHelperMethods.focus(target);
  },
  "blur .form-group .form-control": function(event, data, template){
    let target = $(event.target);
    FormControlHelperMethods.blur(target);
  },
  "click .form-group .input-group-addon": function(event, data, template){
    let target = $(event.target);
    target.parents(".form-group").find("input").focus();
  },
});

Template.body.onRendered(function(){

  setInterval(function(){
    $(".form-group .form-control").each(function(index, element){
      FormControlHelperMethods.checkIfHasValue($(element));
    });
  }, 1300);

});
