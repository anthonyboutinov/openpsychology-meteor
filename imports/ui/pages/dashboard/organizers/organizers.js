import './organizers.html';

import { organizerRemoveUI } from '/imports/ui/components/dashboard/action.organizerRemoveUI.js';

let MAX_ORGANIZERS_PER_USER = 100;

Template.dashboardOrganizers.helpers({
  maxOrganizersCountReached: function() {
    return this.organizers().count() >= MAX_ORGANIZERS_PER_USER;
  },

});


Template.dashboardOrganizers.events({
  'click [mo-action="remove"]': organizerRemoveUI
});
