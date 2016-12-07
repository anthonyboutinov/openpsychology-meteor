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
  showWelcomeNotification() {
    return Meteor.user().profile.systemNotifications.includes(SystemNotifications.showWelcomeNotification);
  },
  showCalendarSubscriptionFunctionalityNotification() {
    return Meteor.user().profile.systemNotifications.includes(SystemNotifications.showCalendarSubscriptionFunctionalityNotification);
  },
});

Template.dashboardUser.events({
  "click [alert-close]"(event, template) {
    const target = $(event.currentTarget);
    const title = target.attr("alert-close");
    Meteor.call("user.profile.systemNotifications.remove", title);
  },
});


Template.dashboardUser.onRendered(function(){
  $('[data-toggle="popover"]').popover();
});
