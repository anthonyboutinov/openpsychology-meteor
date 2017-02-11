import { Categories }  from '/imports/api/categories/index.js';
import { Events }      from '/imports/api/events/collection.js';
import { Organizers } from '/imports/api/organizers/collection.js';

/*
----------------------------
Dashboard.Events.Liked route
----------------------------
*/
Router.route("/dashboard/events/liked", function() {
  this.subscribe('categories').wait();
  this.subscribe('organizers.managedByUser').wait();

  this.subscribe('events.liked', {
    limit: 100,
    sort: {'dates.dateFrom': 1}
  }).wait();

  this.layout('mergedLayout', {
    data: {
      sublayoutType: "dashboardLayout",
      subscriptionsReady: () => {
        return this.ready();
      },
      timeframe: this.params.timeframe,
      events_: () => {
        return Events.find();
      },
      organizers: () => {
        return Organizers.find({}, {sort: {'name': 1}});
      },
      group: 'liked',
    }
  });
  if (this.ready()) {
    this.render('dashboardEvents');
  } else {
    this.render('loading');
  };

}, {
  name: "dashboard.events.liked"
});
