import { Categories }  from '/imports/api/categories/index.js';
// import { Events }      from '/imports/api/events/collection.js';
// import { Organizers } from '/imports/api/organizers/collection.js';

/*
----------------------------
Dashboard.Home route
----------------------------
*/
Router.route("/admin", function() {
  this.subscribe('categories').wait();

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
    this.render('adminHome');
  } else {
    this.render('loading');
  };

}, {
  name: "admin"
});
