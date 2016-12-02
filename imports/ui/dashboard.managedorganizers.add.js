import { Organizers } from '../api/organizers.js';

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
    Router.go('dashboard.managedOrganizers');
  }
};
AutoForm.addHooks(['insertOrganizerForm'], hooksObject);
