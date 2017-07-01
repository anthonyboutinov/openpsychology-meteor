/*
----------------------------
Dashboard.Organizers route
----------------------------
*/
Router.route("/admin/organizers", function() {
  const user = Meteor.user();
  if (!user || !_.contains(user.roles.__global_roles__, 'admin')) {
    this.redirect("/dashboard/user");
  }

  this.subscribe('categories').wait();
  this.subscribe('organizers.all').wait();
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
    this.render('adminOrganizers');
  } else {
    this.render('loading');
  };

}, {
  name: "admin.organizers"
});
