import './dashboard.html';

import '/imports/ui/components/common/footer.js';
import '/imports/ui/components/dashboard/navbar.js';
import '/imports/ui/components/dashboard/sidenavbar.js';
import { ReactiveVar } from 'meteor/reactive-var';

Template.dashboardLayout.onRendered(function(){

  this.$('.scrollbar-macos').scrollbar();

  this.data.windowWidth = new ReactiveVar($(window).width());
  console.log(this.data.windowWidth.get());

  const self = this;

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
      reactiveVar.set($(window).width());
    }
  }, 500);

  $(window).resize(function() {
    console.log("dashboardLayout: Window Resize");
    debouncedSetWindowWidthVar(self.data.windowWidth);
  });

  const Slideout = require('slideout');
  const slideoutInstance = new Slideout({
    'menu': this.$('#menu').get(0),
    'panel': this.$('#panel').get(0),
    'padding': 256,
    'tolerance': 70
  });

  $('.toggle-slideout').on('click', function(event) {
    if (self.data.windowWidth.get() < 768) {
      if (!$(event.target).hasClass("arrow")) {
        slideoutInstance.toggle();
      }
    }
});
});
