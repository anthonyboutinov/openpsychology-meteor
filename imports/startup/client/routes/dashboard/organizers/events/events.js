import { Categories }  from '/imports/api/categories/index.js';
import { Events }      from '/imports/api/events/collection.js';
import { Organizers } from '/imports/api/organizers/collection.js';


let QUERY_LIMIT = 6 * 5;

/*
----------------------------
Dashboard.Organizer.Events route
----------------------------
*/
Router.route("/dashboard/organizer/:_id/events", function() {
  this.subscribe('categories').wait();
  this.subscribe('organizers.managedByUser').wait();
  this.subscribe('organizer', this.params._id).wait();
  this.subscribe('events.byOrganizer', {
    _idOrganizer: this.params._id,
    options: {
      sort: {'dates.dateFrom': -1},
      limit: QUERY_LIMIT,
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
        return Organizers.findOne({_id: this.params._id});
      },
      events_: () => {
        return Events.find({}, {orderBy: {'name': 1}});
      },
    }
  });
  if (this.ready()) {
    this.render('dashboardOrganizerEvents');
  } else {
    this.render('loading');
  };

}, {
  name: "dashboard.organizer.events"
});
