Template.dashboardSidenavbar.helpers({
  isActive: function(name) {
    return Router.current().route.getName() == name ? "active" : false;
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
  organizersSubMenuIsOpen: function() {
    return SessionStore.get("dashboard.sidenavbar.organizersSubMenuIsOpen") ? "open" : false;
  }
});

Template.dashboardSidenavbar.events({
  "click #organizersSubMenuOpenToggle": function(event, template){
    event.preventDefault();
    let currentValue = SessionStore.get("dashboard.sidenavbar.organizersSubMenuIsOpen") ? true : false;
    console.log(!currentValue);
    SessionStore.set("dashboard.sidenavbar.organizersSubMenuIsOpen", !currentValue);
  }
});
