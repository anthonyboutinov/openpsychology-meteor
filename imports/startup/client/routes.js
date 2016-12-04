import { Categories }  from '../../api/categories.js';
import { Events }      from '../../api/events.js';
import { Organizers } from '../../api/organizers.js';
// import { Likes } from '../../api/likes.js';
import * as queryByDate from '../../../both/queryByDate.js';

export const QUERY_LIMIT = 6 * 5;

Router.configure({
  // the default layout
  layoutTemplate: 'defaultLayout'
});


/*
----------------------------
Home route
----------------------------
*/
Router.route('/', function () {
  this.subscribe('categories').wait();
  this.layout('defaultLayout', {
    data: {
      subscriptionsReady: () => {
        return this.ready();
      },
    }
  });
  if (this.ready()) {
    this.render('home');
  } else {
    this.render('loading');
  };
}, {
  name: "home",
});


/*
----------------------------
Loading route
----------------------------
*/
Router.route('/__loading', function() {
  this.render('loading');
});


/*
----------------------------
Search events route
----------------------------
*/
Router.route('/search/:categoryUrlName', function() {
  this.subscribe('categories').wait();

  const categoryUrlName = this.params.categoryUrlName;
  const categoriesUrlNamesList = categoryUrlName != "none" ? categoryUrlName.split("") : false;

  if (SessionStore.get('events.limit') == null || SessionStore.get('categoryUrlName') != categoryUrlName) {
    SessionStore.set('events.limit', QUERY_LIMIT);
  }
  // update categoryUrlName value after `if` check
  SessionStore.set('categoryUrlName', categoryUrlName);

  const subscribedToEvents = categoriesUrlNamesList != false;
  if (subscribedToEvents) {
    this.subscribe('events', {
      categoriesUrlNamesList: categoriesUrlNamesList,
      constainsText: SessionStore.get('events.search.text'),
      datesRange: {
        from: SessionStore.get('events.search.dates.from'),
        to:   SessionStore.get('events.search.dates.to'),
      },
      options: {
        sort: {'dates.dateFrom': -1},
        limit: SessionStore.get('events.limit'),
      }
    }).wait();
  }

  this.layout('defaultLayout', {
    data: {
      currentCategories: () => {
        if (categoriesUrlNamesList) {
          return Categories.find({urlName: {$in: categoriesUrlNamesList}}, {reactive: false});
        } else {
          return false;
        }
      },
      searchbarSupported: true,
      showSearchbar: this.params.query.sb == "true",
      events_: () => {
        if (subscribedToEvents) {
          return Events.find().map((event) => {
            event.category = Categories.findOne({_id: event.categoryId});
            return event;
          });
        }
        return [];
      },
      subscribedToEvents: subscribedToEvents,
      subscriptionsReady: () => {
        return this.ready();
      },
    },
  });
  this.render('list');
}, {
  name: "search",
});


/*
----------------------------
Event route
----------------------------
*/
Router.route("/event/:_id", function() {
  this.subscribe('categories').wait();
  this.subscribe('event', this.params._id).wait();

  const event = Events.findOne({ _id: this.params._id });
  event.category = Categories.findOne({_id: event.categoryId});

  this.layout('defaultLayout', {
    data: {
      subscriptionsReady: () => {
        return this.ready();
      },
      event: event,
    }
  });
  if (this.ready()) {
    this.render('event');
  } else {
    this.render('loading');
  };

}, {
  name: "event"
});


/*
----------------------------
Organizer route
----------------------------
*/
Router.route("/organizer/:_id", function() {
  this.subscribe('categories').wait();
  this.subscribe('organizer', this.params._id).wait();
  this.subscribe('events.byOrganizer', {
    _idOrganizer: this.params._id,
    options: {
      sort: {'dates.dateFrom': -1},
      limit: QUERY_LIMIT,
    }
  }).wait();
  this.layout('defaultLayout', {
    data: {
      subscriptionsReady: () => {
        return this.ready();
      },
      events_: () => {
        return Events.find().map((event) => {
          event.category = Categories.findOne({_id: event.categoryId});
          return event;
        });
      },
      organizer: Organizers.findOne({ _id: this.params._id }),
    }
  });
  if (this.ready()) {
    this.render('organizer');
  } else {
    this.render('loading');
  };

}, {
  name: "organizer"
});


/*
----------------------------
Dashboard.User route
----------------------------
*/
Router.route("/dashboard/user", function() {
  this.subscribe('categories').wait();
  this.subscribe('organizers.managedByUser').wait();

  this.subscribe('events.userRegistered', {
    userId: Meteor.user()._id,
    timeframe: "ongoing",
    options: {
      limit: 2,
      orderBy: {'dates.dateFrom': 1}
    }
  }).wait();

  this.subscribe('events.userRegistered', {
    userId: Meteor.user()._id,
    timeframe: "upcoming",
    options: {
      limit: 2,
      orderBy: {'dates.dateFrom': 1}
    }
  }).wait();

  this.subscribe('events.userRegistered.counts', {
    userId: Meteor.user()._id,
    timeframe: "past"
  }).wait();

  this.subscribe('events.userRegistered.counts', {
    userId: Meteor.user()._id,
    timeframe: "upcoming"
  }).wait();

  this.subscribe('events.userRegistered.counts', {
    userId: Meteor.user()._id,
    timeframe: "ongoing"
  }).wait();

  const findParamsUpcomingEvents = queryByDate.setFindUpcoming({});
  const findParamsOngoingEvents = queryByDate.setFindOngoing({});

  this.layout('dashboardLayout', {
    data: {
      subscriptionsReady: () => {
        return this.ready();
      },
      ongoingEvents: () => {
        return Events.find(findParamsOngoingEvents).map((event) => {
          event.category = Categories.findOne({_id: event.categoryId});
          return event;
        });
      },
      upcomingEvents: () => {
        return Events.find(findParamsUpcomingEvents).map((event) => {
          event.category = Categories.findOne({_id: event.categoryId});
          return event;
        });
      },
      gotMoreOngoingEvents: () => {
        return Counter.get('events.userRegistered.counts.ongoing') > Events.find(findParamsOngoingEvents).count();
      },
      gotMoreUpcomingEvents: () => {
        return Counter.get('events.userRegistered.counts.upcoming') > Events.find(findParamsUpcomingEvents).count();
      },
      ongoingEventsCountLeft: () => {
        return Counter.get('events.userRegistered.counts.ongoing') - Events.find(findParamsOngoingEvents).count();
      },
      upcomingEventsCountLeft: () => {
        return Counter.get('events.userRegistered.counts.upcoming') - Events.find(findParamsUpcomingEvents).count();
      },
      organizers: () => {
        return Organizers.find({}, {orderBy: {'name': 1}});
      },
    }
  });
  if (this.ready()) {
    this.render('dashboardUser');
  } else {
    this.render('loading');
  };

}, {
  name: "dashboard.user"
});


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


/*
----------------------------
Dashboard.ManagedOrganizers route
----------------------------
*/
Router.route("/dashboard/organizers", function() {
  this.subscribe('organizers.managedByUser').wait();

  this.layout('dashboardLayout', {
    data: {
      subscriptionsReady: () => {
        return this.ready();
      },
      organizers: () => {
        return Organizers.find({}, {orderBy: {'name': 1}});
      },
    }
  });
  if (this.ready()) {
    this.render('dashboardManagedOrganizers');
  } else {
    this.render('loading');
  };

}, {
  name: "dashboard.organizers"
});


/*
----------------------------
Dashboard.ManagedOrganizers.Add route
----------------------------
*/
Router.route("/dashboard/organizers/add", function() {
  this.subscribe('organizers.managedByUser').wait();

  this.layout('dashboardLayout', {
    data: {
      subscriptionsReady: () => {
        return this.ready();
      },
      organizers: () => {
        return Organizers.find({}, {orderBy: {'name': 1}});
      },
    }
  });
  if (this.ready()) {
    this.render('dashboardManagedOrganizersAdd');
  } else {
    this.render('loading');
  };

}, {
  name: "dashboard.organizers.add"
});

/*
----------------------------
Dashboard.ManagedOrganizers.Update route
----------------------------
*/
Router.route("/dashboard/organizer/:_id/update", function() {
  this.subscribe('organizers.managedByUser').wait();
  this.subscribe('organizer', this.params._id).wait();

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
      }
    }
  });
  if (this.ready()) {
    this.render('dashboardManagedOrganizersUpdate');
  } else {
    this.render('loading');
  };

}, {
  name: "dashboard.organizer.update"
});

/*
----------------------------
Dashboard.Organizer.Events route
----------------------------
*/
Router.route("/dashboard/organizer/:_id/events", function() {
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
        return Events.find().map((event) => {
          event.category = Categories.findOne({_id: event.categoryId});
          return event;
        });
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
