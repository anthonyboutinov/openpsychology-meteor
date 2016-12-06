import './like.html';

Template.likeButton.helpers({
  'faClass': function() {
    if (this.userLikedIt()) {
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

    if (this.userLikedIt()) {
      this.unlike();
      target.find('i.fa').removeClass('animated bounceIn');
    } else {
      this.like();
      target.find('i.fa').addClass('animated bounceIn');
    }
  }
});
