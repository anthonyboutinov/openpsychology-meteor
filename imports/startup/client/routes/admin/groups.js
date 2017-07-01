/*
----------------------------
Dashboard.Groups route
----------------------------
*/
Router.route("/admin/groups", function() {
  const user = Meteor.user();
  if (!user || !user.roles || !_.contains(user.roles.__global_roles__, 'admin')) {
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
    this.render('adminGroups');
  } else {
    this.render('loading');
  };

}, {
  name: "admin.groups"
});
