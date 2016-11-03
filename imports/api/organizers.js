import { Mongo } from 'meteor/mongo';
import { Categories } from './categories.js';

export const Organizers = new Mongo.Collection("organizers");


if (Meteor.isServer) {

  Meteor.publish('organizer', function(_id) {
    return Organizers.find({ _id: _id});
  });

}
