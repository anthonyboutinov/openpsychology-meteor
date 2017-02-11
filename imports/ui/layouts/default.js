import { Categories } from '/imports/api/categories';

import './default.html';

import '/imports/ui/components/common/footer.js';
import '/imports/ui/components/main/navbar/navbar.js';
import '/imports/ui/components/main/searchbar/searchbar.js';


/*
  debounce
  --
  Creates and returns a new debounced version of the passed function which will
  postpone its execution until after wait milliseconds have elapsed since the
  last time it was invoked. Useful for implementing behavior that should only happen
  after the input has stopped arriving. For example: rendering a preview of
  a Markdown comment, recalculating a layout after the window has stopped being
  resized, and so on.
*/
const debouncedSetWindowWidthVar = _.debounce(function(reactiveVar) {
  if (reactiveVar) {
    console.log("debouncedSetWindowWidthVar " + $(window).width());
    reactiveVar.set($(window).width());
  }
}, 500);


Template.defaultLayout.helpers({
  showSidenavbar() {
    if (!this.windowWidth) return false;
    const width = this.windowWidth.get();
    if (width < 786) {
      this.shideoutInstance.set(new Slideout({
        'menu': self.$('#menu').get(0),
        'panel': self.$('#panel').get(0),
        'padding': 256,
        'tolerance': 70
      }));
      return true;
    } else {
      this.shideoutInstance.set(null);
      return false;
    }
  },
});

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

const Slideout = require('slideout');

// function windowResize

Template.defaultLayout.onRendered(function(){
  this.data.windowWidth = new ReactiveVar($(window).width());
  console.log(this.data.windowWidth.get());

  this.data.shideoutInstance = new ReactiveVar(null);

  const self = this;
  $(window).resize(function() {
    debouncedSetWindowWidthVar(self.data.windowWidth);
  });

});

Template.defaultLayout.onDestroyed(function(){
  $(window).off('resize', throttledOnWindowResize);
});
