import { Mongo } from 'meteor/mongo';
import { Categories } from './categories.js';

export const Events = new Mongo.Collection("events");

const parseDateRussianFormat = function(st) {
  const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
  return new Date(st.replace(pattern,'$3-$2-$1'));
}

if (Meteor.isServer) {
  // This code only runs on the server
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

    if (params.datesRange.from) {
      if (findParams.date == null) {
        findParams.date = {};
      }
      findParams.date.$gt = parseDateRussianFormat(params.datesRange.from);
    }
    if (params.datesRange.to) {
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

  Meteor.publish('event', function(_id) {
    return Events.find({ _id: _id});
  });

}
