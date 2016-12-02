Template.dashboardManagedOrganizersRemoveModal.events({
  'click [mo-action="remove"]': function(event, template) {
    const doc = this;
    Meteor.call("organizers.remove", doc._id, function(error, result) {
      if (error) {
        alert(error);
      } else {
        Modal.hide("dashboardManagedOrganizersRemoveModal");
        setTimeout(function(){
           Modal.show("alertSuccess");
           setTimeout(function(){
              Modal.hide("alertSuccess");
           }, 1500);
        }, 400);
      }
    });
  }
});
