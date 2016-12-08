AccountsTemplates.configure({

    defaultLayout: 'accountsLayout',

    // Behavior
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
    lowercaseUsername: true,
    focusFirstInput: true,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: false,
    showResendVerificationEmailLink: false,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Privacy Policy and Terms of Use
    privacyUrl: 'privacy',
    termsUrl: 'terms-of-use',

    // Redirects
    // homeRoutePath: '/',
    redirectTimeout: 4000,

    // Hooks
    // onLogoutHook: myLogoutFunc,
    // onSubmitHook: mySubmitFunc,
    // preSignUpHook: myPreSubmitFunc,
    // postSignUpHook: myPostSubmitFunc,

    // Texts
    // texts: {
    //   button: {
    //       signUp: "Register Now!"
    //   },
    //   socialSignUp: "Register",
    //   socialIcons: {
    //       "meteor-developer": "fa fa-rocket"
    //   },
    //   title: {
    //       forgotPwd: "Recover Your Password"
    //   },
    // },
});


Router.plugin('ensureSignedIn', {
  except: _.pluck(AccountsTemplates.routes, 'name').concat(['home', 'event', 'organizer', 'search'])
});

AccountsTemplates.configureRoute('signIn', {
    name: 'signin',
    path: '/login',
    // template: 'accounts',
    redirect: function(){
        var user = Meteor.user();
        if (user) {
          Router.go('/dashboard/user/');
        }
    }
});

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
