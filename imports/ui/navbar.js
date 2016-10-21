import { Categories } from '../api/categories.js';

Template.navbar.helpers({
  "searchbarActive": function() {
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
  "isActiveRouteHome": function() {
    return Router.current().route.getName() == "home" ? "active" : false;
  },
  "categories": function() {
    return Categories.find({}, {sort: {order: 1}});
  },
});
