import './navbar.html';

Template.dashboardNavbar.helpers({
  username: function() {
    return Meteor.user().emails[0].address;
  },
});
