import { Likes } from '../api/likes.js';

Template.likeButton.helpers({
  'count': function() {
    // console.log(Likes.find().fetch());
    // const document = Likes.findOne({_id: this.event._id});
    // return document ? document.count : false;
    return null;
  },
  'userLikedIt': function() {
    return Meteor.user() ? Meteor.call('likes.userLikedIt', this.event._id) : false;
  },
  'faClass': function() {

    // if (Meteor.user()) {
    //   Meteor.call('likes.userLikedIt', this.event._id, function(error, result) {
    //     console.log("likes.userLikedIt: " + result);
    //   });
    // }

    const likedIt = false;
    if (likedIt) {
      return "fa-heart";
    } else {
      return "fa-heart-o";
    }
  },
});

Template.likeButton.events({
  'click button': function(event, template) {
    if (!Meteor.user()) {
      return;
    }

    const target = $(event.currentTarget);

    const likedIt = target.find('i.fa').hasClass("fa-heart");
    if (likedIt) {
      Meteor.call('likes.remove', template.data.event._id);
    } else {
      Meteor.call('likes.add', template.data.event._id);
    }
    target.find('i.fa').toggleClass('animated bounceIn');

  }
});
