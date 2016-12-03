Template.dashboardSidenavbar.helpers({
  isActive: function(name) {
    return Router.current().route.getName() == name ? "active" : false;
  },
  childThereofIsActive: function(name) {
    return Router.current().route.getName().indexOf(name) >= 0 ? "active" : false;
  },
  textThumbnailAcronym: function(str) {
    let firstLetter = str.substr(0, 1);
    let spacePosition = str.indexOf(' ');
    if (spacePosition < 0) {
      return firstLetter;
    }
    let secondLetter = str.substr(spacePosition + 1, 1);
    return firstLetter + secondLetter;
  },
  subMenuIsOpen: function(id) {
    return SessionStore.get("dashboard.sidenavbar.subMenuIsOpen." + id) ? "open" : false;
  },
});

Template.dashboardSidenavbar.events({
  "click [submenu-toggle]": function(event, template){
    event.preventDefault();
    let target = $(event.currentTarget);
    let id = target.attr("submenu-toggle");
    let currentValue = SessionStore.get("dashboard.sidenavbar.subMenuIsOpen." + id) ? true : false;
    SessionStore.set("dashboard.sidenavbar.subMenuIsOpen." + id, !currentValue);
  }
});
