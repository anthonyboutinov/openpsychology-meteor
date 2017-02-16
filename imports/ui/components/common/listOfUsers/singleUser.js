import './singleUser.html';
import '../im/im-short.js';

Template.listOfUsersSingleUser.helpers({
  username: function() {
    return this.profile.name ? this.profile.name : this.emails[0].address;
  },
});


Template.listOfUsersSingleUserDropdown.events({
  'click a[data-action="reject"]'(event) {
    event.preventDefault();
    Meteor.call("event.registerForEvent", this.eventId, false, this._id, function(result) {
      // TODO: display notification that it's done
    });
  },

  'click a[data-action="im-short"]'(event) {
    event.preventDefault();
    Blaze.renderWithData(Template["im-short"], this, $('body')[0]);
  },
});
