import { Categories } from '../api/categories.js';

Template.navbar.helpers({
  "searchbarActive": function() {
    return this.showSearchbar ? "active" : this.currentCategories && this.currentCategories().count() > 1 ? "searchbar-active-but-hidden" : false;
  },
  "isActiveRouteHome": function() {
    return Router.current().route.getName() == "home" ? "active" : false;
  },
  "categories": function() {
    return Categories.find({}, {sort: {order: 1}});
  },
});
