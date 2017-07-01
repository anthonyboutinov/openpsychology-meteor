import './event.html';

// Template.eventListItem.helpers({
//
// });

Template.eventListItem.events({

  'click [mo-action="remove"]'(event, template) {
    event.preventDefault();
    const doc = this;
    console.log(doc.category());
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
      doc.remove(function(error, result) {
        if (error || !result) {
          const text = (error ? error.message : "Действие не имеет результата.");
          swal("Ошибка", text, "error");
        } else {
          swal("Удалено!", doc.category().singularName + " «" + doc.title + "» удалено.", "success");
        }
      });
    });
  },

});
