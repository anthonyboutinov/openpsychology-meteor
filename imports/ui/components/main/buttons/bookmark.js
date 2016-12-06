import './bookmark.html';

Template.bookmarkButton.helpers({
  'faClass': function() {
    if (this.userBookmarkedIt()) {
      return "fa-bookmark";
    } else {
      return "fa-bookmark-o";
    }
  },
});

Template.bookmarkButton.events({
  'click button': function(event, template) {
    if (!Meteor.user()) {
      return;
    }
    const target = $(event.currentTarget);

    if (this.userBookmarkedIt()) {
      this.removeBookmark();
      target.find('i.fa').removeClass('animated fadeIn');
    } else {
      this.bookmark();
      target.find('i.fa').addClass('animated fadeIn');
    }
  },
});
