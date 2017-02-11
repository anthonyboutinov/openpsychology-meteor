AccountsTemplates.configure({

    defaultLayout: 'accountsLayout',

    // Behavior
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: true,
    lowercaseUsername: true,
    // focusFirstInput: !Meteor.isCordova,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: false,
    showResendVerificationEmailLink: false,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: true,
    negativeValidation: true,
    positiveValidation: false,
    positiveFeedback: false,
    showValidating: true,

    // Privacy Policy and Terms of Use
    privacyUrl: 'privacy',
    termsUrl: 'terms-of-use',

    // Redirects
    redirectTimeout: 0,

    // Hooks
    onLogoutHook: function(){
      const path = SessionStore.get("router.mainSiteSection.lastVisitedPage") || '/';
      Router.go(path);
    },
    // onSubmitHook: mySubmitFunc,
    // preSignUpHook: myPreSubmitFunc,
    // postSignUpHook: myPostSubmitFunc,

    // Texts
    texts: {
      resendVerificationEmailLink_pre: "Потеряли сообщение для подтверждения адреса email?",
      resendVerificationEmailLink_link: "Отправить еще раз",
      resendVerificationEmailLink_suff: "",
      signInLink_pre: "Есть аккаунт?",
      signInLink_link: "Войти",
      signInLink_suff: "",
    },
});


Router.plugin('ensureSignedIn', {
  except: _.pluck(AccountsTemplates.routes, 'name').concat(['home', 'event', 'organizer', 'search', 'version'])
});

AccountsTemplates.configureRoute('signIn', {
    name: 'signin',
    path: '/login',
    // template: 'accounts',
    redirect: function(){
        if (Meteor.user()) {
          const path = SessionStore.get("router.mainSiteSection.lastVisitedPage") || '/dashboard/user/';
          Router.go(path);
        }
    }
});


// Задать текст ошибок на поля: через удаление и добавление поля
// AccountsTemplates.removeField('password');
// AccountsTemplates.addField({
//     _id: 'password',
//     type: 'password',
//     required: true,
//     minLength: 6,
//     re: /(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
//     errStr: 'At least 1 digit, 1 lower-case and 1 upper-case',
// });


// AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd', {
  name: 'dashboard.resetPassword',
  path: '/dashboard/settings/resetPassword',
  template: 'dashboardLayout'
});
// AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
