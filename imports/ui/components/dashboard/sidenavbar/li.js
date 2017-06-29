import './li.html';

Template.sidenavbarLi.helpers({
  isActive: function(name) {
    return Router.current().route.getName() == name ? "active" : false;
  },
});
