import './logoutLi.html';

Template.sidenavbarLogoutLi.events({
  'click a'() {
    AccountsTemplates.logout();
  },
});
