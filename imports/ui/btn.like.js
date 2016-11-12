Template.likeButton.helpers({
  'count': function() {
    return 10;
  },
  'userLikedIt': function() {
    // return Meteor.user() ? Meteor.call('likes.userLikedIt', this.event._id) : false;
    return false;
  },
  'faClass': function() {
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
      // Meteor.call('likes.remove', template.data.event._id);
    } else {
      // Meteor.call('likes.add', template.data.event._id);
    }
    target.find('i.fa').toggleClass('animated bounceIn')
    .toggleClass('fa-heart fa-heart-o');

  }
});
