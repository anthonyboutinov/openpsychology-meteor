import './navbar.html';

import { composeTitle, siteBaseTitle } from '/imports/startup/client/routes/composeTitle.js';

Template.dashboardNavbar.helpers({
  username: function() {
    const user = Meteor.user();
    if (!user) return " ";
    return user.profile.name ? user.profile.name : user.emails[0].address;
  },
  lastMainSiteRoute() {
    return {
      href:  SessionStore.get("router.mainSiteSection.lastVisitedPage") || '/',
      label: composeTitle(SessionStore.get("router.mainSiteSection.lastVisitedPageTitle")),
    }
  },
});
