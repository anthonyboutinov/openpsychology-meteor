import './merged.html';

import '/imports/ui/components/common/footer.js';

import '/imports/ui/components/dashboard/navbar.js';
import '/imports/ui/components/dashboard/sidenavbar.js';

import '/imports/ui/components/main/navbar/navbar.js';
import '/imports/ui/components/main/searchbar/searchbar.js';

import { ReactiveVar } from 'meteor/reactive-var';

const Slideout = require('slideout');

export const maxWindowWidthForSidenavbar = 768;

const slideoutNewInstanceParameters = () => {
  return {
    'menu': $('#menu').get(0),
    'panel': $('#panel').get(0),
    'padding': 256,
    'tolerance': 70
  }
};

Template.mergedLayout.helpers({
  dashboardMode() {
    return this.sublayoutType == "dashboardLayout";
  },
  displaySidenavbar() {
    // console.log("displaySidenavbar triggered");

    const self = Template.instance();

    if (this.sublayoutType == "dashboardLayout") {
      _.defer(() => {
        if (!self.slideoutInstance) {
          const params = slideoutNewInstanceParameters();
          console.log(params);
          self.slideoutInstance = new ReactiveVar(new Slideout(params));
        } else if (self.slideoutInstance && self.slideoutInstance.get() == null) {
          self.slideoutInstance.set(new Slideout(slideoutNewInstanceParameters()));
        }
        $('.scrollbar-macosx').scrollbar();
      });
      // console.log("displaySidenavbar triggered: true");
      return true;
    }

    // Continuing with sublayoutType == 'defaultLayout'|null in mind

    if (!self.windowWidth) {
      if (self.slideoutInstance) {
        self.slideoutInstance.set(null);
        _.defer(() => {
          const panel = $("#panel");
          panel.removeClass("slideout-panel slideout-panel-left");
        });
      }
      // console.log("displaySidenavbar triggered: false");
      return false;
    }

    const width = self.windowWidth.get();
    if (width < maxWindowWidthForSidenavbar) {
      _.defer(() => {
        if (!self.slideoutInstance) {
          const params = slideoutNewInstanceParameters();
          console.log(params);
          self.slideoutInstance = new ReactiveVar(new Slideout(params));
        } else if (self.slideoutInstance && self.slideoutInstance.get() == null) {
          self.slideoutInstance.set(new Slideout(slideoutNewInstanceParameters()));
        }
        $('.scrollbar-macosx').scrollbar();
      });
      // console.log("displaySidenavbar triggered: true");
      return true;
    } else {
      if (self.slideoutInstance) {
        self.slideoutInstance.set(null);
        _.defer(() => {
          const panel = $("#panel");
          panel.removeClass("slideout-panel slideout-panel-left");
        });
      }
      // console.log("displaySidenavbar triggered: false");
      return false;
    }
  },
});

Template.mergedLayout.events({
  "click .toggle-slideout": function(event, template){
    if (template.slideoutInstance && template.windowWidth.get() < maxWindowWidthForSidenavbar) {
      if (!$(event.target).hasClass("arrow")) {
        template.slideoutInstance.get().toggle();
      }
    }
  },
  "click .toggle-slideout-away": function(event, template){
    if (template.slideoutInstance && template.windowWidth.get() < maxWindowWidthForSidenavbar) {
      if (!$(event.target).hasClass("arrow")) {
        const slideoutInstance = template.slideoutInstance.get();
        console.log(slideoutInstance);
        if (slideoutInstance._opened || slideoutInstance._opening) {
          slideoutInstance.toggle();
          console.log(slideoutInstance);
        }
      }
    }
  }
});

Template.mergedLayout.onRendered(function(){
  $('.scrollbar-macosx').scrollbar();
  this.windowWidth = new ReactiveVar($(window).width());
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
      const width = $(window).width();
      if (reactiveVar.get() == width) {
        // console.log("window width not changed");
        return;
      }
      // console.log("set window width: ", width);
      reactiveVar.set(width);
    }
  }, 200);

  $(window).resize(function() {
    debouncedSetWindowWidthVar(self.windowWidth);
  });

  const params = slideoutNewInstanceParameters();
  // const slideoutInstance = new Slideout(params);
  // this.slideoutInstance = new ReactiveVar(slideoutInstance);
});
