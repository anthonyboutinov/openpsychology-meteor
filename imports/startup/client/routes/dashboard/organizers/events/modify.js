import { Events }      from '/imports/api/events/collection.js';
import { Organizers } from '/imports/api/organizers/collection.js';

/*
----------------------------
Dashboard.Organizer.Events.Add route
----------------------------
*/
Router.route("/dashboard/modify/organizer/:organizerId/event/:eventId?", function() {
  this.subscribe('categories').wait();
  this.subscribe('organizers.managedByUser').wait();
  this.subscribe('coaches.byOrganizer', this.params.organizerId).wait();

  if (this.params.eventId) {
    this.subscribe('event', this.params.eventId).wait();
  }

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
        const organizer = Organizers.findOne(this.params.organizerId);
        if (!organizer) {
          this.redirect("/dashboard/organizers");
        }
        return organizer;
      },
      event: () => {
        return this.params.eventId ? Events.findOne(this.params.eventId) : null;
      },
    }
  });
  if (this.ready()) {
    this.render('dashboardOrganizerEventModify');
  } else {
    this.render('loading');
  };

}, {
  name: "dashboard.organizer.event.modify"
});
