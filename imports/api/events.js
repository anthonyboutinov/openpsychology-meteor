import { Mongo } from 'meteor/mongo';
import { Categories } from './categories.js';

export const Events = new Mongo.Collection("events");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('events', function(params) {
    const categoryIds = Categories.find({urlName: {$in: params.categoriesUrlNamesList}}).map( (v) => {return v._id} );
    let findParams = {categoryId: {$in: categoryIds}};

    if (params.constainsText != null && params.constainsText != '') {
      console.log("Searching Events w/text: " + params.constainsText);
      findParams.$or = [
        {title:       {$regex : ".*" + params.constainsText + ".*", $options: "i"}},
        {description: {$regex : ".*" + params.constainsText + ".*", $options: "i"}},
      ];
    }

    Counts.publish(this, 'events.count', Events.find(findParams), {noReady: true});
    return Events.find(findParams, params.options);
  });

}
