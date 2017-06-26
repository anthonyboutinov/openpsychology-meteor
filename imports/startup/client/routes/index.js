export const QUERY_LIMIT = 6 * 5;

//TODO: maybe this has to go somewhere else
Meteor.subscribe('conversations.forUser');

Router.configure({
  // The default layout:
  layoutTemplate: 'loadingLayout',
  // Google Analytics, site-wide page tracking:
  trackPageView: true,
  // Define a subscription for all routes here:
  // waitOn: function() {
  //   // if (Meteor.userId()) {
  //     const subsctiptions = [Meteor.subscribe('conversations.forUser')];
  //     console.log(subsctiptions);
  //     return subsctiptions;
  //   // }
  // },
});

// Router.plugin('dataNotFound', {notFoundTemplate: 'notFound'});

Router.onStop(function () {
  SessionStore.set("router.mainSiteSection.lastVisitedPage", this.url);
}, {
  only: ['event', 'search', 'home', 'organizer', 'version']
});

import './accounts.js';
import './main';
import './dashboard';
import './loading.js';
