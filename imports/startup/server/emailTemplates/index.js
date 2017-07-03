Accounts.emailTemplates.siteName = 'Открытая психология';
Accounts.emailTemplates.from = 'Открытая психология <anton4488@gmail.com>';
Accounts.emailTemplates.enrollAccount.subject = (user) => {
  return `Добро пожаловать в Открытую психологию!`;
};
Accounts.emailTemplates.enrollAccount.text = (user, url) => {
  return 'Вы были выбраны для участия в создании лучшего будущего!'
    + ' Чтобы активировать Вас аккаунт, просто перейдите по ссылке:\n\n'
    + url;
};
Accounts.emailTemplates.resetPassword.from = () => {
  // Overrides the value set in `Accounts.emailTemplates.from` when resetting
  // passwords.
  return 'Сброс пароля Открытая психология <anton4488@gmail.com>';
};
Accounts.emailTemplates.verifyEmail = {
   subject() {
      return "Активирейте Ваш аккаунт сейчас!";
   },
   text(user, url) {
      return `Здравствуйте! Подтвердите свой email, перейдя по ссылке:\n\n${url}`;
   }
};
