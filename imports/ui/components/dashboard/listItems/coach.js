import './coach.html';

Template.coachListItem.helpers({
  firstPartNameLabel() {
    return this.name.substr(0, _.lastIndexOf(this.name, " "));
  },
  secondPartNameLabel() {
    return this.name.substr(_.lastIndexOf(this.name, " ") + 1);
  },
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
          const text = (error ? error.message : "Действие не имеет результата.");
          swal("Ошибка", text, "error");
        } else {
          swal("Удалено!", doc.name + " удален.", "success");
        }
      });
    });
  }
});
