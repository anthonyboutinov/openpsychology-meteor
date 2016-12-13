import { Organizers } from '/imports/api/organizers/collection.js';

/*
----------------------------
Dashboard.Settings route
----------------------------
*/
Router.route("/dashboard/settings", function() {
  this.subscribe('organizers.managedByUser').wait();

  this.layout('dashboardLayout', {
    data: {
      subscriptionsReady: () => {
        return this.ready();
      },
      organizers: () => {
        return Organizers.find({}, {sort: {'name': 1}});
      },
    }
  });
  if (this.ready()) {
    this.render('dashboardSettings');
  } else {
    this.render('loading');
  };

}, {
  name: "dashboard.settings"
});
