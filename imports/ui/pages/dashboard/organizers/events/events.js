import './events.html';

Template.dashboardOrganizerEvents.helpers({

});

Template.dashboardOrganizerEvents.events({
  'click [mo-action="delete"]': function(event, template) {
    event.preventDefault();
    // const target = $(event.currentTarget);
    const doc = this;
    swal({
      title: "Вы уверены?",
      text: doc.category().singularName + " «" + doc.title + "» будет удалено!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Удалить",
      closeOnConfirm: false,
      html: false
    }, function() {
      doc.remove();
      swal("Удалено!", doc.category().singularName + " «" + doc.title + "» удалено.", "success");
    });
  },
});
