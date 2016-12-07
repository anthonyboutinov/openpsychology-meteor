import { Categories } from '/imports/api/categories';

import './navbar.html';

import './navbar_category.js';

Template.navbar.helpers({
  searchbarActive: function() {
    if (this.showSearchbar) {
      return "active";
    } else {
      const cc = this.currentCategories;
      if (cc == null) {
        return false;
      }
      const ccValue = cc();
      return ccValue && ccValue.count() > 1 ? "searchbar-active-but-hidden" : false;
    }
  },
  isActiveRouteHome: function() {
    return Router.current().route.getName() == "home" ? "active" : false;
  },
  categories: function() {
    return Categories.find({}, {sort: {order: 1}});
  },

  username: function() {
    const user = Meteor.user();
    return user.profile.name ? user.profile.name : user.emails[0].address;
  },
});
