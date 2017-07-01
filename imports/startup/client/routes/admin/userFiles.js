/*
----------------------------
Dashboard.UserFiles route
----------------------------
*/
Router.route("/admin/userfiles", function() {
  const user = Meteor.user();
  if (!user || !_.contains(user.roles.__global_roles__, 'admin')) {
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
    this.render('adminUserFiles');
  } else {
    this.render('loading');
  };

}, {
  name: "admin.userFiles"
});
