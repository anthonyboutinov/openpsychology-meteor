import { Events } from '../api/events.js';
import { QUERY_LIMIT } from '../startup/client/routes.js';

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
    const instance = Template.instance();
    if (!instance.data.subscriptionsReady()) {
      // console.log("allItemsFetched not ready");
      return false;
    }
    // console.log(Counts.get('events.count'), Events.find().count());
    // console.log(!instance.data.subscribedToEvents);
    if (!instance.data.subscribedToEvents) {
      return true;
    }
    return Counts.get('events.count') == Events.find().count();
  },
  initialLoading: function() {
    const instance = Template.instance();
    return !instance.data.allItemsFetched() && instance.data.events_().length == 0;
  },

});

Template.list.events({

});

Template.list.onDestroyed(function() {
  clearInterval(this.interval);
});

Template.list.onRendered(function() {
  if (this.data.subscribedToEvents) {
    let footerHeight = $("#document-footer").outerHeight() + $(window).height();
    this.interval = setInterval(() => {

      if (!this.data.subscriptionsReady()) {
        return;
      }

      const offset = $(window).scrollTop() + $(window).height();
      const height = $(document).height();

      if (height - offset <= footerHeight && Counts.get('events.count') > this.data.events_().length) {
        const currentLimit = SessionStore.get('events.limit');
        const newLimit = currentLimit + QUERY_LIMIT;
        SessionStore.set('events.limit', newLimit);
      }

    }, 1000); // Page scroll check rate (for infinite scrolling)
  }



});
