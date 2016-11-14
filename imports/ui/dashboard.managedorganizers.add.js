import { Organizers } from '../api/organizers.js';

Template.dashboardManagedOrganizersAdd.helpers({
  Organizers: function() {
    return Organizers;
  }
});


Template.dashboardManagedOrganizersAdd.events({

});
