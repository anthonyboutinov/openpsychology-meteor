Template.dashboardManagedOrganizersRemoveModal.events({
  'click [mo-action="remove"]': function(event, template) {
    const doc = this;
    console.log(doc);
    Meteor.call("organizers.remove", doc._id);
  }
});
