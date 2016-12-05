import { Categories } from '/imports/api/categories';

import './default.html';

import '/imports/ui/components/common/footer.js';
import '/imports/ui/components/main/navbar/navbar.js';
import '/imports/ui/components/main/searchbar/searchbar.js';


Template.defaultLayout.events({
  "click #showSearchbar": function(event, template){
    if (this.showSearchbar) {
      event.preventDefault();
      Router.go(window.location.pathname);
    } else if (this.searchbarSupported) {
      event.preventDefault();
      Router.go(window.location.pathname + "?sb=true");
    } else {
      event.preventDefault();
      const allCategoriesUrlNames = Categories.find({}, {reactive: false, fields: {urlName: 1}}).map((v) => {return v.urlName}).join("");
      Router.go("/search/" + allCategoriesUrlNames + "?sb=true")
    }

  },
  // "click .hideSearchbar": function(event, template) {
  //   Router.go(Router.current().route.path(this) + "?sb=false");
  // }
});
