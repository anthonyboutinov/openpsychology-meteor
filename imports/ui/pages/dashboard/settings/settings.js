import './settings.html';

import '/imports/ui/components/dashboard/settings';
import { Organizers } from '/imports/api/organizers/collection.js';

const ChangePasswordSchema = new SimpleSchema({
  password: {
    type: String,
    label: "Password",
    min: 6
  },
  newPassword: {
    type: String,
    min: 6,
    label: "Password Confirmation",
  },
  passwordConfirmation: {
    type: String,
    min: 6,
    label: "Password Confirmation",
    custom: function() {
      if (this.value !== this.field('newPassword').value) {
        return "passwordMissmatch";
      }
    }
  },
});

Template.dashboardSettings.helpers({
  ChangePasswordSchema: ChangePasswordSchema,
  ownedOrganizers() {
    return Organizers.find({ownerId: Meteor.userId()});
  },
});

Template.dashboardSettings.events({
  'click [mo-action="removeUser"]'(event, template) {
    swal({
      title: "Вы уверены?",
      text: "Если Вы удалите аккаунт, его будет невозможно восстановить. Пожалуйста, введите свой пароль.",
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
            Router.go('/');

            Meteor.call('user.remove', function(error, result) {
              if (error) {
                swal("Ошибка!", error.message, "danger");
              } else {
                swal("Аккаунт удален!", "Вся информация об аккаунте удалена.", "success");
              }
            });

          } else {
            swal.showInputError("Неверный пароль!");
          }
        });
      }
    });
  },
});
