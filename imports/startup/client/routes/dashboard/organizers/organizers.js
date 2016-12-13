import { Organizers } from '/imports/api/organizers/collection.js';

/*
----------------------------
Dashboard.Organizers route
----------------------------
*/
Router.route("/dashboard/organizers", function() {
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
    this.render('dashboardOrganizers');
  } else {
    this.render('loading');
  };

}, {
  name: "dashboard.organizers"
});
