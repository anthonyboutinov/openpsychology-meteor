import { Mongo } from 'meteor/mongo';
import { Categories } from './categories.js';

export const Events = new Mongo.Collection("events");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('events', (params) => {
    if (params.options.limit == null) {
      params.options.limit = 30;
    }
    const categoryIds = Categories.find({urlName: {$in: params.categoriesUrlNamesList}}).map( (v) => {return v._id} );
    return Events.find({categoryId: {$in: categoryIds}}, params.options);
  });
}
