// import { atvImg } from '../../client/atvimg-custom/atvImg.js';

Template.dashboardUser.helpers({
  pastEventsCount: () => {
    return Counter.get('events.userRegistered.counts.past');
  },
});

Template.dashboardUser.onRendered(function(){
  // atvImg();
});
