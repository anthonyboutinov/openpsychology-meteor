import { Categories } from '/imports/api/categories';

import './default.html';

import '/imports/ui/components/common/footer.js';
import '/imports/ui/components/main/navbar/navbar.js';
import '/imports/ui/components/main/searchbar/searchbar.js';


Template.defaultLayout.events({
  "click #showSearchbar": function(event, template){
    event.preventDefault();
    if (this.showSearchbar) {
      Router.go(window.location.pathname);
    } else if (this.searchbarSupported) {
      Router.go(window.location.pathname + "?sb=true");
    } else {
      const allCategoriesUrlNames = Categories.find({}, {fields: {urlName: 1}}).map((v)=>{return v.urlName}).join("");
      Router.go("/search/" + allCategoriesUrlNames + "?sb=true")
    }

  },
  // "click .hideSearchbar": function(event, template) {
  //   Router.go(Router.current().route.path(this) + "?sb=false");
  // }
});
