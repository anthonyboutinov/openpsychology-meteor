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
  let categoryUrlName = this.params.categoryUrlName;

  this.subscribe('categories').wait();

  if (Session.get('events.limit') == null) {
    Session.set('events.limit', QUERY_LIMIT);
  }
  const categoriesUrlNamesList = categoryUrlName != "none" ? categoryUrlName.split("") : false;
  this.subscribe('events', {
    categoriesUrlNamesList: categoriesUrlNamesList,
    options: {
      sort: {createdAt: -1},
      limit: Session.get('events.limit'),
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
    },
  });
  this.render('list');
}, {
  name: "search",
});
