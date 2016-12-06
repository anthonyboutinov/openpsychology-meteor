import { Categories }  from '/imports/api/categories/index.js';
import { Events }      from '/imports/api/events/collection.js';

let QUERY_LIMIT = 6 * 5;

/*
----------------------------
Search events route
----------------------------
*/
Router.route('/search/:categoryUrlName', function() {
  this.subscribe('categories').wait();

  const categoryUrlName = this.params.categoryUrlName;
  const categoriesUrlNamesList = categoryUrlName != "none" ? categoryUrlName.split("") : false;

  if (SessionStore.get('events.limit') == null || SessionStore.get('categoryUrlName') != categoryUrlName) {
    SessionStore.set('events.limit', QUERY_LIMIT);
  }
  // update categoryUrlName value after `if` check
  SessionStore.set('categoryUrlName', categoryUrlName);

  const subscribedToEvents = categoriesUrlNamesList != false;
  if (subscribedToEvents) {
    this.subscribe('events', {
      categoriesUrlNamesList: categoriesUrlNamesList,
      constainsText: SessionStore.get('events.search.text'),
      datesRange: {
        from: SessionStore.get('events.search.dates.from'),
        to:   SessionStore.get('events.search.dates.to'),
      },
      options: {
        sort: {'dates.dateFrom': -1},
        limit: SessionStore.get('events.limit'),
      }
    }).wait();
  }

  this.layout('defaultLayout', {
    data: {
      currentCategories: () => {
        if (categoriesUrlNamesList) {
          return Categories.find({urlName: {$in: categoriesUrlNamesList}}, {reactive: false});
        } else {
          return false;
        }
      },
      searchbarSupported: true,
      showSearchbar: this.params.query.sb == "true",
      events_: () => {
        return Events.find();
      },
      subscribedToEvents: subscribedToEvents,
      subscriptionsReady: () => {
        return this.ready();
      },
    },
  });
  this.render('list');
}, {
  name: "search",
});
