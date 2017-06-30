import * as queryByDate from '/both/queryByDate.js';

/*
----------------------------
Dashboard.Users route
----------------------------
*/
Router.route("/admin/users", function() {
  const userId = Meteor.userId();
  if (!_.contains(Meteor.user().roles.__global_roles__, 'admin')) {
    this.redirect("/dashboard/user");
  }

  this.subscribe('users.all').wait();

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
    this.render('adminUsers');
  } else {
    this.render('loading');
  };

}, {
  name: "admin.users"
});
