import { Mongo } from 'meteor/mongo';

export const Categories = new Mongo.Collection("categories");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('categories', function() {
    return Categories.find({}, {sort: {order: 1}});
  });
}
