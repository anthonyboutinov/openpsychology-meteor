import { check } from 'meteor/check';
import { Events } from './collection.js';
import * as queryByDate from '/both/queryByDate.js';
import { Categories } from '/imports/api/categories';
import { Organizers } from '/imports/api/organizers/collection.js';

if (Meteor.isServer) {

  /*
  params: {
    categoriesUrlNamesList - array of strings,
    constainsText - string,
    datesRange: {
      from - formatted date string,
      to - formatted date string,
    },
    options - Collection.find options dictionary
  }
  */
  Meteor.publish('events', function(params) {
    const categoryIds = Categories.find({urlName: {$in: params.categoriesUrlNamesList}}, {fields: {_id: 1}}).map((v)=>{return v._id});

    let findParams = {categoryId: {$in: categoryIds}};
    if (params.addFindParams) {
      _.extend(findParams, params.addFindParams);
    }

    findParams = queryByDate.setFindContainsText(findParams, params.constainsText);

    let datesRangeAsDates = {};
    if (params.datesRange && params.datesRange.from) {
      datesRangeAsDates.from = queryByDate.parseDateRussianFormat(params.datesRange.from);
    }
    if (params.datesRange && params.datesRange.to) {
      datesRangeAsDates.to = queryByDate.parseDateRussianFormat(params.datesRange.to);
    }

    findParams = queryByDate.setFindDatesRange(findParams, datesRangeAsDates);

    // console.log(params);
    // console.log(JSON.stringify(findParams));

    Counts.publish(this, 'events.count', Events.find(findParams), {noReady: true});
    return Events.find(findParams, params.options);
  });


  /*
  params: {
    _idOrganizer - ID,
    options - Collection.find options dictionary
  }
  */
  Meteor.publish('events.byOrganizer', function(params) {
    check(params._idOrganizer, String);

    let findParams = {
      'organizer._id': params._idOrganizer
    };
    if (params.addFindParams) {
      _.extend(findParams, params.addFindParams);
    }

    Counts.publish(this, 'events.byOrganizer.count', Events.find(findParams), {noReady: true});
    const events = Events.find(findParams, params.options);
    return events;
  });


  /*
  params: {
    userId - ID,
    timeframe - "past" || "ongoing" || "upcoming",
    options - Collection.find options dictionary
  }
  */
  Meteor.publish('events.userRegistered', function(params) {
    check(params.userId, String);
    if (params.timeframe) {
      check(params.timeframe, String);
    }

    let findParams = {
      'registeredForEvent': params.userId
    };

    if (params.timeframe == "past") {
      findParams = queryByDate.setFindPast(findParams);
    } else if (params.timeframe == "ongoing") {
      findParams = queryByDate.setFindOngoing(findParams);
    } else if (params.timeframe == "upcoming") {
      findParams = queryByDate.setFindUpcoming(findParams);
    }

    // console.log(JSON.stringify(findParams));
    const events = Events.find(findParams, params.options);
    return events;
  });


  /*
  params: {
    userId - ID,
    timeframe - "past" || "ongoing" || "upcoming"
  }
  */
  Meteor.publish('events.userRegistered.counts', function(params) {
    check(params.userId, String);
    check(params.timeframe, String);

    let findParams = {
      'registeredForEvent': params.userId
    };

    if (params.timeframe == "past") {
      findParams = queryByDate.setFindPast(findParams);
    } else if (params.timeframe == "ongoing") {
      findParams = queryByDate.setFindOngoing(findParams);
    } else if (params.timeframe == "upcoming") {
      findParams = queryByDate.setFindUpcoming(findParams);
    }

    return new Counter('events.userRegistered.counts.' + params.timeframe, Events.find(findParams));
  });


  Meteor.publish('events.liked.count', function() {
    check(this.userId, String);

    let findParams = {
      'likes.userId': this.userId
    };

    return new Counter('events.liked.count', Events.find(findParams));
  });


  /*
  params: {
    options - Collection.find options dictionary
  }
  */
  Meteor.publish('events.liked', function(options) {
    check(this.userId, String);

    let findParams = {
      'likes.userId': this.userId
    };

    return Events.find(findParams, options);
  });


  /*
  params: {
    options - Collection.find options dictionary
  }
  */
  Meteor.publish('events.bookmarked', function(options) {
    check(this.userId, String);

    let findParams = {
      'bookmarks.userId': this.userId
    };

    return Events.find(findParams, options);
  });


  Meteor.publish('events.bookmarked.count', function() {
    check(this.userId, String);

    let findParams = {
      'bookmarks.userId': this.userId
    };

    return new Counter('events.bookmarked.count', Events.find(findParams));
  });


  Meteor.publish('events.bookmarked.lastOne', function() {
    check(this.userId, String);

    let findParams = {
      'bookmarks.userId': this.userId
    };

    return Events.find(findParams, {
      limit: 1, orderBy: 'createdAt' // TODO: orberBy must be different
    });
  });



  Meteor.publish('event', function(_id) {
    console.log(_id);
    // Find event and fetch it to know needed properties
    const event = Events.findOne(_id, {fileds: {isPublished: 1, organizer: 1}});
    console.log(event);
    if (event && event.isPublished) {
      // If event is published -- return it
      return Events.find(_id);
    } else if (event && this.userId) {
      // If event is not published but there is a user logged in
      // Find if this event is from an managed organizer
      const organizerThatIsManagedByThisUser = Organizers.findOne({_id: event.organizer._id, 'managedBy.userId': this.userId}, {fileds: {_id: 1}});
      console.log(organizerThatIsManagedByThisUser);
      if (organizerThatIsManagedByThisUser) {
        // If so, display this hidden event (to organizer who manages it)
        return Events.find(_id);
      }
    }
    return [];
  });

}
