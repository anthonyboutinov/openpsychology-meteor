import { Categories }  from '/imports/api/categories/index.js';
// import { Events }      from '/imports/api/events/collection.js';
// import { Organizers } from '/imports/api/organizers/collection.js';

import * as queryByDate from '/both/queryByDate.js';

/*
----------------------------
Dashboard.Promotions route
----------------------------
*/
Router.route("/admin/promotions", function() {
  this.subscribe('categories').wait();

  const userId = Meteor.userId();
  if (!_.contains(Meteor.user().roles.__global_roles__, 'admin')) {
    this.redirect("/dashboard/user");
  }

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
