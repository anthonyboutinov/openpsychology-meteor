import { Categories }  from '/imports/api/categories/index.js';
import { Events }      from '/imports/api/events/collection.js';
import { Organizers } from '/imports/api/organizers/collection.js';

/*
----------------------------
Dashboard.Events route
----------------------------
*/
Router.route("/dashboard/events/:timeframe", function() {
  this.subscribe('categories').wait();
  this.subscribe('organizers.managedByUser').wait();

  const userId = Meteor.userId();
  const params = {
    userId: userId,
    timeframe: this.params.timeframe,
    options: {
      limit: 100,
      sort: {'dates.dateFrom': 1}
    }
  }
  this.subscribe('events.userRegistered', params).wait();
  this.subscribe('organizers.forEvents.userRegistered', params).wait();

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
    }
  });
  if (this.ready()) {
    this.render('dashboardEvents');
  } else {
    this.render('loading');
  };

}, {
  name: "dashboard.events"
});
