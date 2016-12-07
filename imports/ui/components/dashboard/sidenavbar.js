import './sidenavbar.html';

Template.dashboardSidenavbar.helpers({

  username: function() {
    const user = Meteor.user();
    return user.profile.name ? user.profile.name : user.emails[0].address;
  },
  isActive: function(name) {
    return Router.current().route.getName() == name ? "active" : false;
  },
  childThereofIsActive: function(name) {
    return Router.current().route.getName().indexOf(name) >= 0 ? "active" : false;
  },
  eventsTimeframeIsActive: function(name) {
    return this.timeframe == name ? "active" : false;
  },
  organizerIsActive: function(_id) {
    return this.organizer && this.organizer._id == _id ? "active" : false;
  },
  // eventsIsActive: function() { // Нет необходимости в этом, так как сейчас и так нет страницы Events. Только ее подвиды.
  //   let name = 'events';
  //   return !this.timeframe && Router.current().route.getName() == name ? "active" : false;
  // },

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

    // Upon clicking on "organizers" submenu toggle, hide "events" submenu
    if (id == "organizers" && currentValue == false) {
      SessionStore.set("dashboard.sidenavbar.subMenuIsOpen." + "events", false);
    }
  }
});
