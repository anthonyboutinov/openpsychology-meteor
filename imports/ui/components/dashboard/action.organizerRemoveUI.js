export const organizerRemoveUI = function(event, template) {
  event.preventDefault();
  const doc = this;
  swal({
    title: "Вы уверены?",
    text: "Организация «" + doc.name + "» и все мероприятия, закрепленные за ней, будут безвозвратно удалены. Чтобы удалить организацию, Вы должны ввести свой пароль.",
    type: "input",
    inputType: "password",
    showCancelButton: true,
    confirmButtonColor: "#d9534f",
    confirmButtonText: "Удалить",
    closeOnConfirm: false,
    html: false
  }, function(typedPassword){

    if (typedPassword === "") {
      swal.showInputError("Вы должны ввести пароль, чтобы выполнить это действие!");
      return false;
    } else {
      let digest = Package.sha.SHA256(typedPassword);
      Meteor.call("user.confirmPassword", digest, function(error, result) {
        if (error) {
          swal.showInputError(error);
        } else if (result == true) {
          Meteor.call('organizers.remove', doc._id);
          swal("Удалено!", "Организация «" + doc.name + "» удалена.", "success");
        } else {
          swal.showInputError("Неверный пароль!");
        }
      });
    }
  });
}
