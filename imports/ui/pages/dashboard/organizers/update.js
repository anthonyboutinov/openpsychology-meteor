import { Organizers } from '/imports/api/organizers/collection.js';

import './update.html';

import '/imports/ui/autoform/afMyFormGroup.js';
import '/imports/ui/autoform/datetimeRange.js';

Template.dashboardManagedOrganizersUpdate.helpers({
  Organizers: function() {
    return Organizers;
  }
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