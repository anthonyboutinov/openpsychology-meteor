import { Categories } from '../../api/categories.js';
import { Events } from '../../api/events.js';

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

Router.route('/search/:categoryUrlName/:page?', function() {
  let categoryUrlName = this.params.categoryUrlName;
  if (categoryUrlName == "all") {
    categoryUrlName = "teos"; // FIXME: Not a good way to handle this
  }

  this.subscribe('categories').wait();

  const eventsSkip = parseInt(this.params.page) ? parseInt(this.params.page - 1) * 30 : 0;
  const categoriesUrlNamesList = categoryUrlName != "none" ? categoryUrlName.split('') : false;
  this.subscribe('events', {
    categoriesUrlNamesList: categoriesUrlNamesList,
    options: {
      sort: {createdAt: -1},
      skip: eventsSkip
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
        } else {
          return false;
        }
      },
    },
  });
  this.render('list');
}, {
  name: "search",
});
