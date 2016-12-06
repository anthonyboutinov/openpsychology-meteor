import { Organizers } from '/imports/api/organizers/collection.js';

/*
----------------------------
Dashboard.Organizers.Update route
----------------------------
*/
Router.route("/dashboard/organizer/:_id/update", function() {
  this.subscribe('organizers.managedByUser').wait();
  this.subscribe('organizer', this.params._id).wait();

  this.layout('dashboardLayout', {
    data: {
      subscriptionsReady: () => {
        return this.ready();
      },
      organizers: () => {
        return Organizers.find({}, {orderBy: {'name': 1}});
      },
      organizer: () => {
        return Organizers.findOne({_id: this.params._id});
      }
    }
  });
  if (this.ready()) {
    this.render('dashboardOrganizersUpdate');
  } else {
    this.render('loading');
  };

}, {
  name: "dashboard.organizer.update"
});
