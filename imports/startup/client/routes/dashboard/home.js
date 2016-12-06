/*
----------------------------
Dashboard.Home route
----------------------------
*/
Router.route("/dashboard", function() {
  this.redirect("/dashboard/user");
}, {
  name: "dashboard.home"
});
