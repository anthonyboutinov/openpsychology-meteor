import './user.html';

import '/imports/ui/components/common/contenteditable';

Template.dashboardUser.helpers({
  pastEventsCount() {
    return Counter.get('events.userRegistered.counts.past');
  },
  profileName() {
    return Meteor.user().profile.name;
  },
  showWelcomeNotification() {
    return Meteor.user().profile.settings.showWelcomeNotification;
  },
  showCalendarSubscriptionFunctionalityNotification() {
    return Meteor.user().profile.settings.showCalendarSubscriptionFunctionalityNotification;
  }
});

Template.dashboardUser.onRendered(function(){
  $('[data-toggle="popover"]').popover();
});
