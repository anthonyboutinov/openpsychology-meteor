import './navbar.html';

import { Categories } from '/imports/api/categories';
import { Organizers } from '/imports/api/organizers/collection.js';
import './navbar_category.js';

Template.navbar.helpers({
  searchbarActive() {
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
  isActiveRoute(name) {
    return Router.current().route.getName() == name ? "active" : false;
  },
  categories() {
    return Categories.find({}, {sort: {order: 1}});
  },
  managedOrganizers() {
    const userId = Meteor.userId();
    return Organizers.find({
      $or: [
        {ownerId: userId},
        {managedBy: userId}
      ]
    }, {sort: {'name': 1}});
  },

  username() {
    const user = Meteor.user();
    return user.profile.name ? user.profile.name : user.emails[0].address;
  },
});
