import { Events }      from '/imports/api/events/collection.js';
import { Organizers } from '/imports/api/organizers/collection.js';

/*
----------------------------
Dashboard.Organizer.Event route
----------------------------
*/
Router.route("/dashboard/organizer/:organizerId/event/:eventId", function() {
  this.subscribe('categories').wait();
  this.subscribe('organizers.managedByUser').wait();
  this.subscribe('coaches.byOrganizer', this.params.organizerId).wait();
  this.subscribe('event', this.params.eventId).wait();

  this.layout('mergedLayout', {
    data: {
      sublayoutType: "dashboardLayout",
      subscriptionsReady: () => {
        return this.ready();
      },
      organizers: () => {
        return Organizers.find({}, {sort: {'name': 1}});
      },
      organizer: () => {
        return Organizers.findOne({_id: this.params.organizerId});
      },
      event: () => {
        return Events.findOne(this.params.eventId);
      },
    }
  });
  if (this.ready()) {
    this.render('dashboardOrganizerEvent');
  } else {
    this.render('loading');
  };

}, {
  name: "dashboard.organizer.event"
});
