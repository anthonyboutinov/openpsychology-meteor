import { Organizers } from '/imports/api/organizers/collection.js';

let QUERY_LIMIT = 6 * 5;

/*
----------------------------
Dashboard.Organizers route
----------------------------
*/
Router.route("/dashboard/organizer/:_id", function() {
  this.subscribe('categories').wait();
  this.subscribe('organizers.managedByUser').wait();
  // this.subscribe('files.organizersManagedBuUser').wait();

  this.subscribe('coaches.byOrganizer', this.params._id).wait();

  this.subscribe('events.byOrganizer', {
    _idOrganizer: this.params._id,
    options: {
      orderBy: {'dates.dateFrom': -1},
    }
  }).wait();

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
