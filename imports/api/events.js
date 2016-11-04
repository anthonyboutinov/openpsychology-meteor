import { Mongo } from 'meteor/mongo';
import { Categories } from './categories.js';

export const Events = new Mongo.Collection("events");

/*
Parses string of format "dd.mm.yyyy" into date
*/
const parseDateRussianFormat = function(st) {
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

    if (params.constainsText) {
      console.log("Searching Events w/text: " + params.constainsText);
      findParams.$or = [
        {title:       {$regex : ".*" + params.constainsText + ".*", $options: "i"}},
        {description: {$regex : ".*" + params.constainsText + ".*", $options: "i"}},
      ];
    }

    if (params.datesRange && params.datesRange.from) {
      const path = ['dates','$not', '$elemMatch', 'dateFrom'];
      if (findParams[path[0]]                   == null) {findParams[path[0]] = {}}
      if (findParams[path[0]][path[1]]          == null) {findParams[path[0]][path[1]] = {}}
      if (findParams[path[0]][path[1]][path[2]] == null) {findParams[path[0]][path[1]][path[2]] = {}}
      if (findParams[path[0]][path[1]][path[2]][path[3]] == null) {findParams[path[0]][path[1]][path[2]][path[3]] = {}}
      findParams[path[0]][path[1]][path[2]][path[3]].$lt = parseDateRussianFormat(params.datesRange.from);
    }
    if (params.datesRange && params.datesRange.to) {
      // add 1 day to make this restriction inclusive
      let dateTo = parseDateRussianFormat(params.datesRange.to);
      dateTo = moment(dateTo).add(1, 'days').toDate();

      const path = ['dates','$not', '$elemMatch', 'dateTo'];
      if (findParams[path[0]]                   == null) {findParams[path[0]] = {}}
      if (findParams[path[0]][path[1]]          == null) {findParams[path[0]][path[1]] = {}}
      if (findParams[path[0]][path[1]][path[2]] == null) {findParams[path[0]][path[1]][path[2]] = {}}
      if (findParams[path[0]][path[1]][path[2]][path[3]] == null) {findParams[path[0]][path[1]][path[2]][path[3]] = {}}
      findParams[path[0]][path[1]][path[2]][path[3]].$gt = dateTo;
    }

    console.log(params);
    console.log(JSON.stringify(findParams));

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
    const findParams = {
      'organizer._id': params._idOrganizer
    };
    console.log(findParams);
    Counts.publish(this, 'events.byOrganizer.count', Events.find(findParams), {noReady: true});
    const events = Events.find(findParams, params.options);
    return events;
  });



  Meteor.publish('event', function(_id) {
    return Events.find({ _id: _id});
  });

}
