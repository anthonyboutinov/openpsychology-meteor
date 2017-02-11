export const QUERY_LIMIT = 6 * 5;

Router.configure({
  // the default layout
  layoutTemplate: 'loadingLayout'
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
