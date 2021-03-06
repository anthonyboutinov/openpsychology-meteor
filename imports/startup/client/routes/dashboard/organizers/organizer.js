import { Organizers } from '/imports/api/organizers/collection.js';

let QUERY_LIMIT = 6 * 5;

/*
----------------------------
Dashboard.Organizer route
----------------------------
*/
Router.route("/dashboard/organizer/:_id", function() {
  this.subscribe('categories').wait();
  this.subscribe('organizers.managedByUser').wait();

  this.subscribe('coaches.byOrganizer', this.params._id).wait();

  this.subscribe('events.byOrganizer', {
    _idOrganizer: this.params._id,
    options: {
      sort: {'dates.dateFrom': 1},
    }
  }).wait();

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
        const organizer = Organizers.findOne(this.params._id);
        if (!organizer) {
          this.redirect("/dashboard/organizers");
        }
        return organizer;
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
