import { Organizers } from '/imports/api/organizers/collection.js';

import './update.html';

import '/imports/ui/autoform/contemporary/afFormGroup.js';
import '/imports/ui/autoform/datetimeRange.js';
import '/imports/ui/components/dashboard/organizersFormFieldset.html';
import * as formControlFunctions from '/imports/ui/formControlFunctions.js';

Template.dashboardOrganizersUpdate.helpers({
  Organizers: function() {
    return Organizers;
  }
});

Template.dashboardOrganizersUpdate.onRendered(function(){

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


let hooksObject = {
  before: {
    update: function(doc) {
      doc.phoneNum = Phoneformat.cleanPhone(doc.phoneNum);
      console.log(doc);
      return doc;
    },
  },
  onSuccess: function(formType, result) {
    Router.go('dashboard.organizers');
  },
  onError: function(formType, error) {
    console.log(error);
  },
};
AutoForm.addHooks(['updateOrganizerForm'], hooksObject);
