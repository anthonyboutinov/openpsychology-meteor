/*
----------------------------
Admin.Markdowns route
----------------------------
*/
Router.route("/admin/markdowns", function() {
  const user = Meteor.user();
  if (!user || !user.roles || !_.contains(user.roles.__global_roles__, 'admin')) {
    this.redirect("/dashboard/user");
  }

  this.subscribe('categories').wait();
  this.subscribe('markdowns.all', {fields: {name: 1, title: 1, updatedAt: 1, updatedBy: 1}}).wait();
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
    this.render('adminMarkdowns');
  } else {
    this.render('loading');
  };

}, {
  name: "admin.markdowns"
});
