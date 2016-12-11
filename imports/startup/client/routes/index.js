export const QUERY_LIMIT = 6 * 5;

Router.configure({
  // the default layout
  layoutTemplate: 'defaultLayout'
});

// Router.plugin('dataNotFound', {notFoundTemplate: 'notFound'});

Router.onStop(function () {
  SessionStore.set("router.mainSiteSection.lastVisitedPage", this.url);
}, {
  only: ['event', 'search', 'home', 'organizer']
});

import './accounts.js';
import './main';
import './dashboard';
import './loading.js';
