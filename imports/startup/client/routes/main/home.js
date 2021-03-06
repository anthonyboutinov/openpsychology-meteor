import { Categories }  from '/imports/api/categories/index.js';
import { composeTitle } from '/imports/startup/client/routes/composeTitle.js';

/*
----------------------------
Home route
----------------------------
*/
Router.route('/', function () {
  this.subscribe('categories').wait();
  if (Meteor.userId()) {
    this.subscribe('organizers.managedByUser').wait();
  }
  this.subscribe('events.inGroup', "homescreen").wait();
  this.subscribe('organizers.forEvents.inGroup', "homescreen").wait();

  this.layout('mergedLayout', {
    data: {
      subscriptionsReady: () => {
        return this.ready();
      },
      isMain: true,
    }
  });
  if (this.ready()) {
    this.render('home');
  } else {
    this.render('loading');
  };
}, {
  name: "home",
  title: function() {
    const title = false;
    SessionStore.set("router.mainSiteSection.lastVisitedPageTitle", title);
    return composeTitle(title);
  }
});
