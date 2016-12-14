import './afFormGroup.html';

Template["afFormGroup_hidden"].helpers({
  afFieldInputAtts: function () {
    var atts = _.omit(this.afFieldInputAtts || {}, 'input-col-class');
    // We have a special template for check boxes, but otherwise we
    // want to use the same as those defined for bootstrap3 template.
    if (AutoForm.getInputType(this.afFieldInputAtts) === "boolean-checkbox") {
      atts.template = "bootstrap3-horizontal";
    } else {
      atts.template = "bootstrap3";
    }
    atts.type = "hidden";
    return atts;
  },
});
