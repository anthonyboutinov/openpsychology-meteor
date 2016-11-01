import { Events } from '../api/events.js';
import { QUERY_LIMIT } from '../startup/client/routes.js';
import { clearSearchbarFields } from './searchbar.xprt.js';

const allItemsFetchedCommonCode = function() {
  const instance = Template.instance();
  if (!instance.data.subscriptionsReady()) {return false;}
  if (!instance.data.subscribedToEvents) {return 'noResults';}
  const eCount = Events.find().count();
  if (Counts.get('events.count') == eCount) {
    if (eCount == 0) {
      return 'noResults';
    } else {
      return true;
    }
  }
  return false;
};



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
    return allItemsFetchedCommonCode()
  },
  allItemsFetchedWithResults: function() {
    return allItemsFetchedCommonCode() === true;
  },
  allItemsFetchedNoResults: function() {
    return allItemsFetchedCommonCode() === 'noResults';
  },
  initialLoading: function() {
    const instance = Template.instance();
    return !instance.data.allItemsFetched() && instance.data.events_().length == 0;
  },
  formatedDate: function(date) {
    return moment(date).format('llll');
  },
  calenderDate: function(date) {
    return moment(date).calendar();
  },

});

Template.list.events({

});

Template.list.onDestroyed(function() {
  clearInterval(this.interval);
  clearSearchbarFields();
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
