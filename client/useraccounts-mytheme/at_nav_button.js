// Simply 'inherites' helpers from AccountsTemplates
Template.atNavButton.helpers(AccountsTemplates.atNavButtonHelpers);

// Simply 'inherites' events from AccountsTemplates
Template.atNavButton.events(AccountsTemplates.atNavButtonEvents);

Template.atNavButton.helpers({
  faClass: function() {
    return this == "Войти" ? "fa-user-circle" : "fa-sign-out";
  }
});
