import { Events }      from '/imports/api/events/collection.js';
import { Organizers } from '/imports/api/organizers/collection.js';

/*
----------------------------
Dashboard.Organizer.Events.Add route
----------------------------
*/
Router.route("/dashboard/organizer/:_id/events/add", function() {
  this.subscribe('categories').wait();
  this.subscribe('organizers.managedByUser').wait();
  this.subscribe('coaches.byOrganizer', this.params._id).wait();

  // TODO: Refactor: move into data, for all similar cases
  let organizer = Organizers.findOne({_id: this.params._id});

  this.layout('dashboardLayout', {
    data: {
      subscriptionsReady: () => {
        return this.ready();
      },
      organizers: () => {
        return Organizers.find({}, {orderBy: {'name': 1}});
      },
      organizer: organizer,
    }
  });
  if (this.ready()) {
    this.render('dashboardOrganizerEventsAdd');
  } else {
    this.render('loading');
  };

}, {
  name: "dashboard.organizer.events.add"
});
