import { Organizers } from '../api/organizers.js';

Template.dashboardManagedOrganizersAdd.helpers({
  Organizers: function() {
    return Organizers;
  }
});


Template.dashboardManagedOrganizersAdd.events({

});

let hooksObject = {
  before: {
    insert: function(doc) {
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
    Router.go('organizer', {_id: this.docId});
  }
};
AutoForm.addHooks(['insertOrganizerForm'], hooksObject);
