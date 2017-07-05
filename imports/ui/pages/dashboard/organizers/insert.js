import { Organizers } from '/imports/api/organizers/collection.js';

import './insert.html';
import '/imports/ui/components/dashboard/organizersForms/fieldset.js';


Template.dashboardOrganizersAdd.helpers({
  Organizers: function() {
    return Organizers;
  }
});

let hooksObject = {
  before: {
    insert: function(doc) {
      doc.ownerId = Meteor.userId();
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
