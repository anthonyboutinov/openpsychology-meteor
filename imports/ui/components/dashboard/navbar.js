import './navbar.html';

Template.dashboardNavbar.helpers({
  username: function() {
    const user = Meteor.user();
    if (!user) return " ";
    return user.profile.name ? user.profile.name : user.emails[0].address;
  },
});
