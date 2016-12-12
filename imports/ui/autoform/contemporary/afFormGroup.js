import './afFormGroup.html';

Template["afFormGroup_contemporary"].helpers({
  afFieldInputAtts: function () {
    var atts = _.omit(this.afFieldInputAtts || {}, 'input-col-class');
    if (atts.prefix) {
      delete atts.prefix;
    }
    // We have a special template for check boxes, but otherwise we
    // want to use the same as those defined for bootstrap3 template.
    if (AutoForm.getInputType(this.afFieldInputAtts) === "boolean-checkbox") {
      atts.template = "bootstrap3-horizontal";
    } else {
      atts.template = "bootstrap3";
    }
    return atts;
  },
  afFieldLabelAtts: function () {
    var atts = _.clone(this.afFieldLabelAtts || {});
    // Add bootstrap class
    atts = AutoForm.Utility.addClass(atts, "control-label");
    return atts;
  },
  // rightColumnClass: function () {
  //   var atts = this.afFieldInputAtts || {};
  //   return atts['input-col-class'] || "";
  // },
  skipLabel: function () {
    var self = this;

    var type = AutoForm.getInputType(self.afFieldInputAtts);
    return (self.skipLabel || (type === "boolean-checkbox" && !self.afFieldInputAtts.leftLabel));
  },

  prefix: function() {
    var atts = _.omit(this.afFieldInputAtts || {}, 'input-col-class');
    return atts.prefix || atts['data-prefix'];
  }
});

// Template["afFormGroup_contemporary"].onRendered(function(){
//
//   this.$('select:not([data-minimumResultsForSearch="Infinity"])').select2({
//     theme: "contemporary",
//   }).on("select2:open", function(event) {
//     let target = $(event.target);
//     formControlFunctions.focus(target);
//   }).on("select2:close", function(event) {
//     let target = $(event.target);
//     formControlFunctions.blur(target);
//   });
//
//   this.$('select[data-minimumResultsForSearch="Infinity"]').select2({
//     theme: "contemporary",
//     minimumResultsForSearch: Infinity,
//   }).on("select2:open", function(event) {
//     let target = $(event.target);
//     formControlFunctions.focus(target);
//   }).on("select2:close", function(event) {
//     let target = $(event.target);
//     formControlFunctions.blur(target);
//   });
//
// });
