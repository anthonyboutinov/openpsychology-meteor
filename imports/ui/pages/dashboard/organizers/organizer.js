import './organizer.html';

import '/imports/ui/components/dashboard/panels/organizer/coaches.js';
import '/imports/ui/components/dashboard/panels/organizer/events.js';
import '/imports/ui/components/common/organizerInfo/contact.js';
import { ReactiveVar } from 'meteor/reactive-var';
import { organizerRemoveUI } from '/imports/ui/components/dashboard/action.organizerRemoveUI.js';
import { getImageLightness } from '/imports/lib/getImageLightness.js';

Template.dashboardOrganizer.helpers({
  pageHeadingColorClass() {
    const bannerBrightness = this.bannerBrightness.get();
    const midBrightnessValue = 180;
    if (!bannerBrightness) return "color-light";
    return bannerBrightness <= midBrightnessValue ? "color-light" : "";
  },
});

Template.dashboardOrganizer.events({
  'click [mo-action="removeOrganizer"]'(event, target) {
    Router.go('dashboard.organizers');
    _.bind(organizerRemoveUI, this, event, target)();
  },
});

Template.dashboardOrganizer.onCreated(function(){

  this.data.bannerBrightness = new ReactiveVar(false);
  bb = this.data.bannerBrightness;

  const organizer = this.data.organizer();
  if (!organizer) return;
  const bannerLink = organizer.bannerLink();
  getImageLightness(bannerLink, function(brightness) {
    console.log(brightness);
    bb.set(brightness);
  });

});
