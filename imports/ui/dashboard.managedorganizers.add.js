import { Organizers } from '../api/organizers/collection.js';

Template.dashboardManagedOrganizersAdd.helpers({
  Organizers: function() {
    return Organizers;
  }
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
