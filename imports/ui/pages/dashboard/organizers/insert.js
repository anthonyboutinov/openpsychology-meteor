import { Organizers } from '/imports/api/organizers/collection.js';

import './insert.html';

import '/imports/ui/autoform/contemporary/afFormGroup.js';
import '/imports/ui/autoform/datetimeRange.js';
import '/imports/ui/components/dashboard/organizersFormFieldset.html';
import * as formControlFunctions from '/imports/ui/formControlFunctions.js';


Template.dashboardOrganizersAdd.helpers({
  Organizers: function() {
    return Organizers;
  }
});

Template.dashboardOrganizersAdd.onRendered(function(){

  $('select').select2({
    placeholder: "Выберите",
    theme: "contemporary",
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
    insert: function(doc) {
      doc.phoneNum = Phoneformat.cleanPhone(doc.phoneNum);
      doc.managedBy = [
        {
          userId: Meteor.userId(),
          nonRetireable: true
        }
      ];
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
AutoForm.addHooks(['insertOrganizerForm'], hooksObject);
