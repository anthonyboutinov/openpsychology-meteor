import { Events } from '../api/events.js';
import { QUERY_LIMIT } from '../startup/client/routes.js';

// let triggered = false;

Template.list.helpers({
  loopCount: function(count){
    var countArr = [];
    for (var i=0; i<count; i++){
      countArr.push({});
    }
    return countArr;
  },
  nbsp: function(str) {
    return str.replace(/&nbsp;/g, '\u00a0');
  },
  shouldClearfix: function(index, grid) {
    return index != 0 && index % grid == 0;
  },
  animationClass: function(index) {
    return index > QUERY_LIMIT ? "animated fadeIn" : false;
  },
  allItemsFetched: function() {
    return Counts.get('events.count') == Events.find().count();
  },

});

Template.list.events({

});

Template.list.onDestroyed(function() {
  clearInterval(this.interval);
  // console.log("interval destryed");
});

Template.list.onRendered(function() {
  // this.triggered = false;
  const FOOTER_IMAGINARY_PADDING_FOR_INFINITE_SCROLLING_TRIGGER = 200;
  let footerHeight = $("#document-footer").outerHeight() + FOOTER_IMAGINARY_PADDING_FOR_INFINITE_SCROLLING_TRIGGER;

  this.interval = setInterval(() => {

    // if (this.triggered) {
    //   return;
    // }

    if (!this.data.subscriptionsReady()) {
      console.log("Events not ready");
      return;
    }

    const offset = $(window).scrollTop() + $(window).height();
    const height = $(document).height();
    // console.log(height - offset, footerHeight);

    // console.log(Counts.get('events.count'), this.data.events_().length);
    if (height - offset <= footerHeight && Counts.get('events.count') > this.data.events_().length) {

      // this.triggered = true;
      // setTimeout(()=>{
      //    this.triggered = false;
      // }, 200);

      const currentLimit = SessionStore.get('events.limit');
      const newLimit = currentLimit + QUERY_LIMIT;
      SessionStore.set('events.limit', newLimit);
      // console.log("New limit: " + newLimit);
    }

  }, 1000);



});
