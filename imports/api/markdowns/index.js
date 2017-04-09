import { Mongo } from 'meteor/mongo';

export const Markdowns = new Mongo.Collection("markdowns");

if (Meteor.isServer) {

  Meteor.publish('markdown', function(name) {
    const mds = Markdowns.find({name: name}, {limit: 1});
    console.log(mds.fetch());
    return mds;
  });

}
