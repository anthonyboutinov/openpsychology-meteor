import './events.html';

import '/imports/ui/components/dashboard/listItems/event.js';


// Template.dashboardPanelOrganizerEvents.helpers({
//
// });

Template.dashboardPanelOrganizerEvents.events({
  'click [mo-action="removeAll"]'(event, template) {
    event.preventDefault();
    const eventIds = this.organizer().events().map(function(doc){return doc._id});
    swal({
      title: "Вы уверены?",
      text: "Все мероприятия будут удалены!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d9534f",
      confirmButtonText: "Удалить",
      closeOnConfirm: false,
      html: false
    }, function() {
      Meteor.call('events.remove', eventIds, function(error, result) {
        if (error || !result) {
          const text = (error ? error.message : "Действие не имеет результата.") + " Отчет об ошибке отправлен разработчикам для устранения. Пожалуйста, подождите, скоро мы все исправим!😉";
          swal("Ошибка", text, "error");
        } else {
          swal("Удалено!", "Удалено " + result + " мероприятий.", "success");
        }
      });
    });
  },
});
