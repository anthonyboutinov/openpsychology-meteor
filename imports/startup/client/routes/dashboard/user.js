import { Categories }  from '/imports/api/categories/index.js';
import { Events }      from '/imports/api/events/collection.js';
import { Organizers } from '/imports/api/organizers/collection.js';

import * as queryByDate from '/both/queryByDate.js';

/*
----------------------------
Dashboard.User route
----------------------------
*/
Router.route("/dashboard/user", function() {
  this.subscribe('categories').wait();
  this.subscribe('organizers.managedByUser').wait();

  const userId = Meteor.userId();
  this.subscribe('events.userRegistered', {
    userId: userId,
    timeframe: "ongoing",
    options: {
      limit: 2,
      sort: {'dates.dateFrom': 1}
    }
  }).wait();

  this.subscribe('events.userRegistered', {
    userId: userId,
    timeframe: "upcoming",
    options: {
      limit: 2,
      sort: {'dates.dateFrom': 1}
    }
  }).wait();

  this.subscribe('events.userRegistered.counts', {
    userId: userId,
    timeframe: "past"
  }).wait();

  this.subscribe('events.userRegistered.counts', {
    userId: userId,
    timeframe: "upcoming"
  }).wait();

  this.subscribe('events.userRegistered.counts', {
    userId: userId,
    timeframe: "ongoing"
  }).wait();

  this.subscribe('events.liked.count').wait();
  this.subscribe('events.bookmarked.count').wait();

  const findParamsLastBookmarkedEvent = {'bookmarks.userId': Meteor.userId()};

  this.subscribe('events.bookmarked.lastOne').wait();

  const findParamsUpcomingEvents = queryByDate.setFindUpcoming({});
  const findParamsOngoingEvents = queryByDate.setFindOngoing({});

  this.layout('mergedLayout', {
    data: {
      sublayoutType: "dashboardLayout",
      subscriptionsReady: () => {
        return this.ready();
      },
      ongoingEvents: () => {
        return Events.find(findParamsOngoingEvents, {sort: {'dates.dateFrom': 1}});
      },
      upcomingEvents: () => {
        return Events.find(findParamsUpcomingEvents, {sort: {'dates.dateFrom': 1}});
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
        return Organizers.find({}, {sort: {'name': 1}});
      },
      eventsLikedCount: () => {
        return Counter.get('events.liked.count');
      },
      eventsBookmarkedCount: () => {
        return Counter.get('events.bookmarked.count');
      },
      lastBookmarkedEvent: () => {
        return Events.findOne(findParamsLastBookmarkedEvent);
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
