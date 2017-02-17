import './event.html';
import { getImageLightness } from '/imports/ui/getImageLightness.js';
import '/imports/ui/components/common/listOfUsers/';

Template.dashboardOrganizerEvent.helpers({
  pageHeadingColorClass() {
    const bannerBrightness = this.bannerBrightness.get();
    const midBrightnessValue = 180;
    if (!bannerBrightness) return "color-light";
    return bannerBrightness <= midBrightnessValue ? "color-light" : "";
  },
});
//
// Template.dashboardOrganizerEvent.events({
//
// });

Template.dashboardOrganizerEvent.onCreated(function(){

  this.data.bannerBrightness = new ReactiveVar(false);
  bb = this.data.bannerBrightness;

  const event = this.data.event();
  if (!event) return;
  const link = event.imageLink();
  getImageLightness(link, function(brightness) {
    console.log(brightness);
    bb.set(brightness);
  });

});
