import './home.html';

// import { SystemNotifications } from '/imports/api/systemNotifications.js';

Template.adminHome.helpers({
  profileName() {
    return Meteor.user().profile.name;
  },
  // showWelcomeNotification() {
  //   return Meteor.user().appSpecific.systemNotifications.includes(SystemNotifications.showWelcomeNotification);
  // },
  // showCalendarSubscriptionFunctionalityNotification() {
  //   return Meteor.user().appSpecific.systemNotifications.includes(SystemNotifications.showCalendarSubscriptionFunctionalityNotification);
  // },
  // SystemNotifications() {
  //   return SystemNotifications;
  // },
  // hasNotifications() {
  //   return Meteor.user().appSpecific.systemNotifications.length;
  // }
});

Template.adminHome.events({
  "click [alert-close]"(event, template) {
    const target = $(event.currentTarget);
    const title = target.attr("alert-close");
    Meteor.call("user.appSpecific.systemNotifications.remove", title, function(error, result) {
      if (error) console.log(error);
    });
  },
});

// Template.admin.onRendered(function(){
//   this.$('[data-toggle="popover"]').popover();
// });
