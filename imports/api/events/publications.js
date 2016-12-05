import { check } from 'meteor/check';
import { Events } from './collection.js';
import * as queryByDate from '../../../both/queryByDate.js';
import { Categories } from '../categories';

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
    const categoryIds = Categories.find({urlName: {$in: params.categoriesUrlNamesList}}).map( (v) => {return v._id} );
    let findParams = {categoryId: {$in: categoryIds}};

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

    const findParams = {
      'organizer._id': params._idOrganizer
    };
    console.log(findParams);
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


  Meteor.publish('event', function(_id) {
    return Events.find({ _id: _id});
  });

}
