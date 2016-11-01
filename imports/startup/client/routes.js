import { Categories } from '../../api/categories.js';
import { Events } from '../../api/events.js';

export const QUERY_LIMIT = 6 * 5;

Router.configure({
  // the default layout
  layoutTemplate: 'defaultLayout'
});

Router.route('/', function () {
  this.subscribe('categories').wait();
  this.layout('defaultLayout', {
    data: {
      subscriptionsReady: () => {
        return this.ready();
      },
    }
  });
  if (this.ready()) {
    this.render('home');
  } else {
    this.render('loading');
  };
}, {
  name: "home",
});

Router.route('/__loading', function() {
  this.render('loading');
});

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
        sort: {createdAt: -1},
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
        if (subscribedToEvents) {
          return Events.find().map((event) => {
            event.category = Categories.findOne({_id: event.categoryId});
            return event;
          });
        }
        return [];
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
