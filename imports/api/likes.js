import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Likes = new Mongo.Collection("likes");

if (Meteor.isServer) {

  // Meteor.publish("likes.counts", function(eventIds) {
  //   check(eventIds, Array);
  //   return Likes.aggregate({
  //     $match: { eventId: { $in: eventIds } },
  //     $group: { _id: '$eventId', count: { $sum: '$likes' } }
  //   });
  // });

  Meteor.methods({
    'likes.count': function(){
      return Likes.find({userId: this.userId}).count();
    },

    'likes.countForEvent': function(eventId){
      const count = Likes.find({eventId: eventId}).count();
      return count;
    },

    'likes.userLikedIt': function(eventId) {
      check(eventId, String);
      return Likes.find({
        userId: this.userId,
        eventId: eventId
      }).count() > 0;
    },

    'likes.add': function(eventId) {
      check(eventId, String);
      check(this.userId, String);
      Likes.insert({
        eventId: eventId,
        userId: this.userId,
        likes: 1
      });
    },

    'likes.remove': function(eventId) {
      check(eventId, String);
      check(this.userId, String);
      Likes.remove({
        eventId: eventId,
        userId: this.userId
      });
    },
  });


}
