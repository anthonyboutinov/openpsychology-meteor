import './user.html';

import '/imports/ui/components/common/contenteditable';
import { SystemNotifications } from '/imports/api/systemNotifications.js';

Template.dashboardUser.helpers({
  pastEventsCount() {
    return Counter.get('events.userRegistered.counts.past');
  },
  profileName() {
    return Meteor.user().profile.name;
  },
  showNotification(titled) {
    return Meteor.user().appSpecific.systemNotifications.includes(titled);
  },
  SystemNotifications() {
    return SystemNotifications;
  },
  hasNotifications() {
    return Meteor.user().appSpecific.systemNotifications.length;
  }
});

Template.dashboardUser.events({
  "click [alert-close]"(event, template) {
    const target = $(event.currentTarget);
    const title = target.attr("alert-close");
    Meteor.call("user.appSpecific.systemNotifications.remove", title, function(error, result) {
      if (error) console.log(error);
    });
  },
});


Template.dashboardUser.onRendered(function(){
  this.$('[data-toggle="popover"]').popover();
});
