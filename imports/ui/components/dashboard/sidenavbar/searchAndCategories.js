import './searchAndCategories.html';

Template.sidenavbarSearchAndCategories.helpers({
  isActive: function(name) {
    return Router.current().route.getName() == name ? "active" : false;
  },
  childThereofIsActive: function(name) {
    return Router.current().route.getName().indexOf(name) >= 0 ? "active" : false;
  },
  searchSubElementIsActive: function(query) {
    return Router.current().route.getName() == 'search' && Router.current().params.categoryUrlName == query ? "active" : false;
  },
  subMenuIsOpen: function(id) {
    return SessionStore.get("dashboard.sidenavbar.subMenuIsOpen." + id) ? "open" : false;
  },
});
