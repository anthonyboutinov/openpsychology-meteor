import './organizersFormFieldset.html';

import '/imports/ui/autoform/contemporary/afFormGroup.js';
import '/imports/ui/autoform/hidden/afFormGroup.js';
import '/imports/ui/autoform/datetimeRange.js';
import '/imports/ui/autoform/fileUpload';
import * as formControlFunctions from '/imports/ui/formControlFunctions.js';

// function initSelect2ForMeteorUsersList(template) {
//   console.log(new Date());
//   template.$('select:not(.select2-hidden-accessible)').select2({
//     theme: "contemporary",
//     ajax: {
//       url: '/rest-api/users/select',
//       type: "GET",
//       dataType: "json",
//       processResults: function (data) {
//         return {results: data};
//       },
//       delay: 400
//     },
//   }).on("select2:open", function(event) {
//     let target = $(event.target);
//     formControlFunctions.focus(target);
//   }).on("select2:close", function(event) {
//     let target = $(event.target);
//     formControlFunctions.blur(target);
//   });
// }

Template.organizersFormFieldset.helpers({
  specialFormTypeIsCollaborators() {
    return this.specialFormType == "collaborators";
  },
  specialFormTypeIsResign() {
    return this.specialFormType == "resign";
  },
});

// Template.organizersFormFieldset.events({
//   'click .autoform-add-item'(event, template) {
//     initSelect2ForMeteorUsersList(template);
//   },
// });

Template.organizersFormFieldset.onRendered(function(){

  if (this.data.specialFormType != null) {
    // initSelect2ForMeteorUsersList(this);
  } else {

    this.$('select:not([data-minimumResultsForSearch="Infinity"])').select2({
      theme: "contemporary",
    }).on("select2:open", function(event) {
      let target = $(event.target);
      formControlFunctions.focus(target);
    }).on("select2:close", function(event) {
      let target = $(event.target);
      formControlFunctions.blur(target);
    });

    this.$('select[data-minimumResultsForSearch="Infinity"]').select2({
      theme: "contemporary",
      minimumResultsForSearch: Infinity,
    }).on("select2:open", function(event) {
      let target = $(event.target);
      formControlFunctions.focus(target);
    }).on("select2:close", function(event) {
      let target = $(event.target);
      formControlFunctions.blur(target);
    });
  }

});
