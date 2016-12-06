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

  this.subscribe('events.userRegistered', {
    userId: Meteor.user()._id,
    timeframe: this.params.timeframe,
    options: {
      limit: 100,
      orderBy: {'dates.dateFrom': 1}
    }
  }).wait();

  this.layout('dashboardLayout', {
    data: {
      subscriptionsReady: () => {
        return this.ready();
      },
      timeframe: this.params.timeframe,
      events_: () => {
        return Events.find().map((event) => {
          event.category = Categories.findOne({_id: event.categoryId});
          return event;
        });
      },
      organizers: () => {
        return Organizers.find({}, {orderBy: {'name': 1}});
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
