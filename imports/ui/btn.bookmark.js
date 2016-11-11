Template.bookmarkButton.events({
  'click [ev-toggle-bookmark-id]': function(event, template) {
    const target = $(event.currentTarget);
    if (target.attr('ev-val-like') == "true") {
      target.attr('ev-val-like', "false");
      target.find('i.fa').toggleClass('fa-bookmark-o fa-bookmark animated fadeIn');
    } else {
      target.attr('ev-val-like', "true");
      target.find('i.fa').toggleClass('fa-bookmark-o fa-bookmark animated fadeIn');
    }
  }
});
