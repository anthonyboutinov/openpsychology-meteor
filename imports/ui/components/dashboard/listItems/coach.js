import './coach.html';


Template.coachListItem.helpers({

});

Template.coachListItem.events({
  'click [mo-action="remove"]'(event, template) {
    event.preventDefault();
    const doc = this;
    swal({
      title: "Вы уверены?",
      text:  doc.name + " будет удален.",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d9534f",
      confirmButtonText: "Удалить",
      closeOnConfirm: false,
      html: false
    }, function(){
      Meteor.call('coach.remove', doc._id, function(error, result) {
        if (error || !result) {
          const text = (error ? error.message : "Действие не имеет результата.") + " Отчет об ошибке отправлен разработчикам для устранения. Пожалуйста, подождите, скоро мы все исправим!😉";
          swal("Ошибка", text, "error");
        } else {
          swal("Удалено!", doc.name + " удален.", "success");
        }
      });
    });
  }
});
