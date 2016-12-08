import { Organizers } from '/imports/api/organizers/collection.js';

/*
----------------------------
Dashboard.Organizers route
----------------------------
*/
Router.route("/dashboard/organizer/:_id", function() {
  this.subscribe('organizers.managedByUser').wait();

  this.subscribe('coaches.byOrganizer', this.params._id).wait();

  this.layout('dashboardLayout', {
    data: {
      subscriptionsReady: () => {
        return this.ready();
      },
      organizers: () => {
        return Organizers.find({}, {orderBy: {'name': 1}});
      },
      organizer: () => {
        return Organizers.findOne(this.params._id);
      },
    }
  });
  if (this.ready()) {
    this.render('dashboardOrganizer');
  } else {
    this.render('loading');
  };

}, {
  name: "dashboard.organizer"
});