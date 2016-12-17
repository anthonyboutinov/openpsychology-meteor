import { Categories }  from '/imports/api/categories/index.js';
import { Events }      from '/imports/api/events/collection.js';
import { composeTitle } from '/imports/startup/client/routes/composeTitle.js';

/*
----------------------------
Home route
----------------------------
*/
Router.route('/', function () {
  this.subscribe('categories').wait();
  this.subscribe('organizers.managedByUser').wait();

  this.layout('defaultLayout', {
    data: {
      subscriptionsReady: () => {
        return this.ready();
      },
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
