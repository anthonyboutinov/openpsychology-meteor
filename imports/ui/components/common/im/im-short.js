import './im-short.html';

Template['im-short'].helpers({
  username: function() {
    return this.profile.name ? this.profile.name : this.emails[0].address;
  },
});


Template['im-short'].events({
  'click [data-action="close"]'(event, template) {
    event.preventDefault();
    Blaze.remove(template.view);
  }
});
