import { Organizers } from '/imports/api/organizers/collection.js';

/*
----------------------------
Dashboard.Organizers.Add route
----------------------------
*/
Router.route("/dashboard/organizers/add", function() {
  this.subscribe('organizers.managedByUser').wait();

  this.layout('mergedLayout', {
    data: {
      sublayoutType: "dashboardLayout",
      subscriptionsReady: () => {
        return this.ready();
      },
      organizers: () => {
        return Organizers.find({}, {sort: {'name': 1}});
      },
    }
  });
  if (this.ready()) {
    this.render('dashboardOrganizersAdd');
  } else {
    this.render('loading');
  };

}, {
  name: "dashboard.organizers.add"
});
