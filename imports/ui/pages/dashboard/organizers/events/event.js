import './event.html';
import { getImageLightness } from '/imports/lib/getImageLightness.js';
import '/imports/ui/components/common/listOfUsers/';
import '/imports/ui/components/dashboard/groupExpirationInfo.js';

Template.dashboardOrganizerEvent.helpers({
  pageHeadingColorClass() {
    const bannerBrightness = this.bannerBrightness.get();
    const midBrightnessValue = 180;
    if (!bannerBrightness) return "color-light";
    return bannerBrightness <= midBrightnessValue ? "color-light" : "";
  },
});

Template.dashboardOrganizerEvent.events({
  'click [data-action="im-short-toAll"]'(event) {
    event.preventDefault();
    Blaze.renderWithData(Template["im-short"], {
      users: this.event().registeredUsers(),
      eventId: this.event()._id,
    }, $('body')[0]);
  },
  'click [data-action="toggleBooking"]'(event) {
    event.preventDefault();
    const thisevent = this.event();
    const bookingOpen = thisevent.bookingOpen || false;
    Meteor.call('event.toggleBooking', thisevent._id, !bookingOpen);
  }
});

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
