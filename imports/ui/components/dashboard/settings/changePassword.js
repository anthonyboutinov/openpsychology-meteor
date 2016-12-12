import './changePassword.html';

Template.changePasswordForm.events({
  'submit form': function(event, template) {
    event.preventDefault();

    const resetPasswordForm = $(event.currentTarget),
          oldPassword = resetPasswordForm.find('#old-password'),
          newPassword = resetPasswordForm.find('#new-password'),
          passwordConfirm = resetPasswordForm.find('#new-password-confirm');

    if (oldPassword.val().length >= 6) {
      const newPasswordVal = newPassword.val();
      if (newPasswordVal.length >= 6) {
        if (newPasswordVal == passwordConfirm.val()) {
          Accounts.changePassword(oldPassword.val(), newPassword.val(), function changePasswordHandler(error){
            if (error) {
              console.log(error);
              if (error.error == 403) {
                oldPassword.parents('.form-group').addClass('has-error has-feedback').find('.help-block').text("Неверный пароль").removeClass('hidden');
              }
            } else {
              resetPasswordForm[0].reset();
              swal("Пароль успешно изменен!", "", "success");
              console.log("success");
            }
          });
        } else {
          // passwords don't match
          passwordConfirm.parents('.form-group').addClass('has-error has-feedback').find('.help-block').text("Пароли не совпадают").removeClass('hidden');
        }
      } else {
        // new password length < 6
        newPassword.parents('.form-group').addClass('has-error has-feedback').find('.help-block').text("Пароль должен содержать не менее 6 символов").removeClass('hidden');
      }
    } else {
      // old password length < 6
      oldPassword.parents('.form-group').addClass('has-error has-feedback').find('.help-block').text("Пароль не может иметь длинну менее 6 символов").removeClass('hidden');
    }
    return false;
  },

  'keyup #old-password, keyup #new-password, keyup #new-password-confirm'(event, template) {
    const target = $(event.currentTarget);
    if (target.val().length > 0) {
      const formGroup = target.parents('.form-group');
      if (formGroup.hasClass('has-feedback')) {
        formGroup.removeClass('has-error has-feedback').find('.help-block').addClass('hidden').text("");
      }
    }
  }
});
