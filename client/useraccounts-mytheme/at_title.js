// Simply 'inherites' helpers from AccountsTemplates
Template.atTitle.helpers(AccountsTemplates.atTitleHelpers);


Template.atTitle.helpers({
  atDisabled() {
    return AccountsTemplates.disabled()
  },
});
