import './events.html';


Template.dashboardPanelOrganizerEvents.helpers({

});

Template.dashboardPanelOrganizerEvents.events({

  'click [mo-action="remove"]': function(event, template) {
    event.preventDefault();
    const doc = this;
    swal({
      title: "Вы уверены?",
      text: doc.category().singularName + " «" + doc.title + "» будет удалено!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d9534f",
      confirmButtonText: "Удалить",
      closeOnConfirm: false,
      html: false
    }, function() {
      doc.remove();
      swal("Удалено!", doc.category().singularName + " «" + doc.title + "» удалено.", "success");
    });
  },

});
