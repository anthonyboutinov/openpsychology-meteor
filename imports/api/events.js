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
      if (findParams.date == null) {
        findParams.date = {};
      }
      findParams.date.$gt = parseDateRussianFormat(params.datesRange.from);
    }
    if (params.datesRange && params.datesRange.to) {
      if (findParams.date == null) {
        findParams.date = {};
      }
      findParams.date.$lt = parseDateRussianFormat(params.datesRange.to);
    }

    console.log(params);
    console.log(findParams);

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
