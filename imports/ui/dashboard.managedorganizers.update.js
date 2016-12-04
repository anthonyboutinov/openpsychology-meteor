import { Organizers } from '../api/organizers.js';

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
  }
};
AutoForm.addHooks(['updateOrganizerForm'], hooksObject);
