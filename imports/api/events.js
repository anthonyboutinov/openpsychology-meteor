import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Categories } from './categories.js';

export const Events = new Mongo.Collection("events");


// setFindContainsText
// ==
function setFindContainsText(findParams, constainsText) {
  if (constainsText) {
    console.log("Searching Events w/text: " + constainsText);
    findParams.$or = [
      {title:       {$regex : ".*" + constainsText + ".*", $options: "i"}},
      {description: {$regex : ".*" + constainsText + ".*", $options: "i"}},
    ];
  }

  return findParams;
}


// setFindDatesRange
// ==
function setFindDatesRange(findParams, datesRange) {

  if (datesRange && datesRange.from) {
    const orArrayInstance = {
      'dateFrom': {
        '$lt': datesRange.from
      }
    };

    const path = ['dates','$not', '$elemMatch', '$or'];
    if (findParams[path[0]]                   == null) {findParams[path[0]] = {}}
    if (findParams[path[0]][path[1]]          == null) {findParams[path[0]][path[1]] = {}}
    if (findParams[path[0]][path[1]][path[2]] == null) {findParams[path[0]][path[1]][path[2]] = {}}
    if (findParams[path[0]][path[1]][path[2]][path[3]] == null) {findParams[path[0]][path[1]][path[2]][path[3]] = []}
    findParams[path[0]][path[1]][path[2]][path[3]].push(orArrayInstance);
  }

  if (datesRange && datesRange.to) {
    // add 1 day to make this restriction inclusive
    let dateTo = datesRange.to;
    dateTo = moment(dateTo).add(1, 'days').toDate();

    const orArrayInstance = {
      'dateTo': {
        '$gt': dateTo
      }
    };

    const path = ['dates','$not', '$elemMatch', '$or'];
    if (findParams[path[0]]                   == null) {findParams[path[0]] = {}}
    if (findParams[path[0]][path[1]]          == null) {findParams[path[0]][path[1]] = {}}
    if (findParams[path[0]][path[1]][path[2]] == null) {findParams[path[0]][path[1]][path[2]] = {}}
    if (findParams[path[0]][path[1]][path[2]][path[3]] == null) {findParams[path[0]][path[1]][path[2]][path[3]] = []}
    findParams[path[0]][path[1]][path[2]][path[3]].push(orArrayInstance);
  }

  return findParams;

}


// setFindOngoing
// ==
function setFindOngoing(findParams) {
  const now = new Date();

  const path = ['dates', '$elemMatch', '$or'];
  if (findParams[path[0]]                   == null) {findParams[path[0]] = {}}
  if (findParams[path[0]][path[1]]          == null) {findParams[path[0]][path[1]] = {}}
  if (findParams[path[0]][path[1]][path[2]] == null) {findParams[path[0]][path[1]][path[2]] = [
    { 'dateFrom': { '$lt': now } },
    { 'dateFrom': { '$gte': now } },
  ]}

  // findParams.dates = {
  //   '$and': [
  //     { 'dateFrom': { '$lt': now } },
  //     { 'dateFrom': { '$gte': now } },
  //   ]
  // };

  return findParams;
}

function setFindPast(findParams) {
  return setFindDatesRange(findParams, {to: new Date()});
}

function setFindUpcoming(findParams) {
  return setFindDatesRange(findParams, {from: new Date()});
}


// parseDateRussianFormat
//
// Parses string of format "dd.mm.yyyy" into date
// ==
function parseDateRussianFormat(st) {
  const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
  return new Date(st.replace(pattern,'$3-$2-$1'));
}

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

    findParams = setFindContainsText(findParams, params.constainsText);

    let datesRangeAsDates = {};
    if (params.datesRange && params.datesRange.from) {
      datesRangeAsDates.from = parseDateRussianFormat(params.datesRange.from);
    }
    if (params.datesRange && params.datesRange.to) {
      datesRangeAsDates.to = parseDateRussianFormat(params.datesRange.to);
    }

    findParams = setFindDatesRange(findParams, datesRangeAsDates);

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
      findParams = setFindPast(findParams);
    } else if (params.timeframe == "ongoing") {
      findParams = setFindOngoing(findParams);
    } else if (params.timeframe == "upcoming") {
      findParams = setFindUpcoming(findParams);
    }

    console.log(JSON.stringify(findParams));

    // Counts.publish(this, 'events.byOrganizer.count', Events.find(findParams), {noReady: true});
    const events = Events.find(findParams, params.options);
    return events;
  });



  Meteor.publish('event', function(_id) {
    return Events.find({ _id: _id});
  });


  Meteor.methods({
    'event.registerForEvent'(eventId, setRegistered) {
      check(eventId, String);
      check(setRegistered, Boolean);

      if (setRegistered) {
        Events.update(eventId, { $push: { registeredForEvent: this.userId} });
      } else {
        Events.update(eventId, { $pull: { registeredForEvent: this.userId} });
      }
    },
  });

}
