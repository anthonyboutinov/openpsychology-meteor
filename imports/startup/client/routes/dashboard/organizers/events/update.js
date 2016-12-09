import { Events }      from '/imports/api/events/collection.js';
import { Organizers } from '/imports/api/organizers/collection.js';

/*
----------------------------
Dashboard.Organizer.Events.Update route
----------------------------
*/
Router.route("/dashboard/event/:_id/update", function() {
  this.subscribe('categories').wait();
  this.subscribe('organizers.managedByUser').wait();
  this.subscribe('event', this.params._id).wait();
  this.subscribe('coaches.byOrganizer', this.params._id).wait();

  const event = Events.findOne({ _id: this.params._id });

  this.layout('dashboardLayout', {
    data: {
      subscriptionsReady: () => {
        return this.ready();
      },
      organizers: () => {
        return Organizers.find({}, {orderBy: {'name': 1}});
      },
      event: event
    }
  });
  if (this.ready()) {
    this.render('dashboardOrganizerEventsUpdate');
  } else {
    this.render('loading');
  };

}, {
  name: "dashboard.organizer.event.update"
});
