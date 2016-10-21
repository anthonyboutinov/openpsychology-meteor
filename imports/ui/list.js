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
    if (!Template.instance().data.subscriptionsReady()) {
      return false;
    }
    return Counts.get('events.count') == Events.find().count();
  },

});

Template.list.events({

});

Template.list.onDestroyed(function() {
  clearInterval(this.interval);
});

Template.list.onRendered(function() {
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



});
