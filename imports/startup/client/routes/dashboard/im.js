import { Categories }  from '/imports/api/categories/index.js';
import { Events }      from '/imports/api/events/collection.js';
import { Organizers } from '/imports/api/organizers/collection.js';

/*
----------------------------
Dashboard.IM route
----------------------------
*/
Router.route("/dashboard/im", function() {
  this.subscribe('categories').wait();
  this.subscribe('organizers.managedByUser').wait();
  this.subscribe('conversations').wait();

  this.layout('mergedLayout', {
    data: {
      sublayoutType: "dashboardLayout",
      subscriptionsReady: () => {
        return this.ready();
      },
      organizers: () => {
        return Organizers.find({}, {sort: {'name': 1}});
      },
      conversationsForUser: () => {
        return Conversations.find({userId: Meteor.userId()}, {sort: {'lastMessageAt': 1}});
      },
      conversationsForOrganizer: (organizerId) => {
        return Conversations.find({organizerId: organizerId}, {sort: {'lastMessageAt': 1}});
      },
    }
  });
  if (this.ready()) {
    this.render('im');
  } else {
    this.render('loading');
  };

}, {
  name: "dashboard.im"
});
