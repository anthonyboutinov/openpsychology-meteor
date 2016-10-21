import { Categories } from '../../api/categories.js';
import { Events } from '../../api/events.js';

const QUERY_LIMIT = 1;

Router.configure({
  // the default layout
  layoutTemplate: 'defaultLayout'
});

Router.route('/', function () {
  this.subscribe('categories').wait();
  this.layout('defaultLayout', {
    data: {
      currentCategories: null,
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

// Router.route('/__loading', function() {
//   this.render('loading');
// });

Router.route('/search/:categoryUrlName', function() {
  this.subscribe('categories').wait();

  const categoryUrlName = this.params.categoryUrlName;
  const categoriesUrlNamesList = categoryUrlName != "none" ? categoryUrlName.split("") : false;

  if (SessionStore.get('events.limit') == null || SessionStore.get('categoryUrlName') != categoryUrlName) {
    SessionStore.set('events.limit', QUERY_LIMIT);
  }
  SessionStore.set('categoryUrlName', categoryUrlName);

  this.subscribe('events', {
    categoriesUrlNamesList: categoriesUrlNamesList,
    options: {
      sort: {createdAt: -1},
      limit: SessionStore.get('events.limit'),
    }
  }).wait();

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
        if (categoriesUrlNamesList) {
          return Events.find().map((event) => {
            event.category = Categories.findOne({_id: event.categoryId});
            return event;
          });
        }
        return false;
      },
      loadMoreActive: () => {
        console.log(Counts.get('events.count'), Events.find().count());
        return Counts.get('events.count') > Events.find().count();
      }
    },
  });
  this.render('list');
}, {
  name: "search",
});
