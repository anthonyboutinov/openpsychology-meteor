// import { Events }      from '/imports/api/events/collection.js';

import * as queryByDate from '/both/queryByDate.js';

/*
----------------------------
Dashboard.Promotions route
----------------------------
*/
Router.route("/admin/promotions", function() {
  const userId = Meteor.userId();
  if (!_.contains(Meteor.user().roles.__global_roles__, 'admin')) {
    this.redirect("/dashboard/user");
  }

  this.subscribe('categories').wait();
  this.subscribe('groups').wait();
  this.subscribe('users.admins').wait();

  this.layout('mergedLayout', {
    data: {
      sublayoutType: "dashboardLayout",
      viewAsAdmin: true,
      subscriptionsReady: () => {
        return this.ready();
      },
    }
  });
  if (this.ready()) {
    this.render('adminPromotions');
  } else {
    this.render('loading');
  };

}, {
  name: "admin.groups"
});
