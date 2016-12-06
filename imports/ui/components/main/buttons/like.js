import './like.html';

Template.likeButton.helpers({
  'count': function() {
    return this.event.likes.length;
  },
  'faClass': function() {
    if (this.event.userLikedIt()) {
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

    if (this.event.userLikedIt()) {
      console.log("call unlike");
      Meteor.call('event.unlike', template.data.event._id);
      target.find('i.fa').removeClass('animated bounceIn');
    } else {
      console.log("call like");
      Meteor.call('event.like', template.data.event._id);
      target.find('i.fa').addClass('animated bounceIn');
    }
  }
});
