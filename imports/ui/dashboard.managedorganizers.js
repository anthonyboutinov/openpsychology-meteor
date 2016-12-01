let MAX_ORGANIZERS_PER_USER = 100;

Template.dashboardManagedOrganizers.helpers({
  maxOrganizersCountReached: function() {
    return this.organizers().count() >= MAX_ORGANIZERS_PER_USER;
  },

});


Template.dashboardManagedOrganizers.events({
  'click [mo-action="delete"]': function(event, template) {
    event.preventDefault();
    // const target = $(event.currentTarget);
    const doc = this;
    Modal.show('dashboardManagedOrganizersRemoveModal', function() {
      return doc;
    });
  }
});
