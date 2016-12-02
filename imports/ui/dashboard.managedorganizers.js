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
    // Modal.show('dashboardManagedOrganizersRemoveModal', function() {
    //   return doc;
    // });
    swal({
      title: "Вы уверены?",
      text: "Организация " + doc.name + " и все мероприятия, закрепленные за ней будут безвозвратно удалены.",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Удалить",
      closeOnConfirm: false,
      html: false
    }, function(){
      swal("Удалено!",
      "Организация " + doc.name + " удалена.",
      "success");
    });
  }
});
