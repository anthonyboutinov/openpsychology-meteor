let MAX_ORGANIZERS_PER_USER = 100;

Template.dashboardManagedOrganizers.helpers({
  maxOrganizersCountReached: function() {
    return this.organizers().count() >= MAX_ORGANIZERS_PER_USER;
  }
});


Template.dashboardManagedOrganizers.events({

});
