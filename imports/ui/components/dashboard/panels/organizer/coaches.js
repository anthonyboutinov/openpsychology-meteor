import './coaches.html';

import '/imports/ui/components/dashboard/listItems/coach.js';

// Template.dashboardPanelOrganizerCoaches.helpers({
//
// });
//
Template.dashboardPanelOrganizerCoaches.events({
  'click [mo-action="removeAll"]'(event, template) {
    event.preventDefault();
    const coachesIds = this.organizer().coaches().map(function(doc){return doc._id});
    swal({
      title: "Вы уверены?",
      text: "Все тренера будут удалены!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d9534f",
      confirmButtonText: "Удалить",
      closeOnConfirm: false,
      html: false
    }, function() {
      Meteor.call('coaches.remove', coachesIds, function(error, result) {
        if (error || !result) {
          const text = (error ? error.message : "Действие не имеет результата.") + " Отчет об ошибке отправлен разработчикам для устранения. Пожалуйста, подождите, скоро мы все исправим!😉";
          swal("Ошибка", text, "error");
        } else {
          swal("Удалено!", "Удалено " + result + " тренеров/ведущих.", "success");
        }
      });
    });
  },
});
