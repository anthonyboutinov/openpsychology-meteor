Template.likeButton.events({
  'click [ev-toggle-like-id]': function(event, template) {
    const target = $(event.currentTarget);
    if (target.attr('ev-val-like') == "true") {
      target.attr('ev-val-like', "false");
      target.find('i.fa').toggleClass('fa-heart-o fa-heart animated bounceIn');
    } else {
      target.attr('ev-val-like', "true");
      target.find('i.fa').toggleClass('fa-heart-o fa-heart animated bounceIn');
    }
  }
});
