import { Mongo } from 'meteor/mongo';

export const Categories = new Mongo.Collection("categories");

if (Meteor.isServer) {

  Meteor.publish('categories', function() {
    return Categories.find({}, {reactive: false});
  });



  // admin permission
  //
  //
  Categories.permit('update').ifHasRole({role:'admin', group: Roles.GLOBAL_GROUP}).onlyProps(['singularName', 'pluralName', 'urlName']).allowInClientCode();

}
