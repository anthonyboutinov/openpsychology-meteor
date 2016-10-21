import { Mongo } from 'meteor/mongo';
import { Categories } from './categories.js';

export const Events = new Mongo.Collection("events");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('events', function(params) {
    const categoryIds = Categories.find({urlName: {$in: params.categoriesUrlNamesList}}).map( (v) => {return v._id} );
    Counts.publish(this, 'events.count', Events.find({categoryId: {$in: categoryIds}}), {noReady: true});
    return Events.find({categoryId: {$in: categoryIds}}, params.options);
  });

}
