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

Router.route('/search/:categoryUrlName', function() {
  this.subscribe('categories').wait();
  let categoryUrlName = this.params.categoryUrlName;
  if (categoryUrlName == "all") {
    categoryUrlName = "teos"; // FIXME: Not a good way to handle this
  }
  const categoriesUrlNamesList = categoryUrlName != "none" ? categoryUrlName.split('') : false;
  this.layout('defaultLayout', {
    data: {
      currentCategories: () => {
        if (categoriesUrlNamesList) {
          return Categories.find({urlName: {$in: categoriesUrlNamesList}});
        } else {
          return false;
        }
      },
      searchbarSupported: true,
      showSearchbar: this.params.query.sb == "true",
      events_: () => {
        if (categoriesUrlNamesList) {
          // Extract categoryIds from Categories based on categoriesUrlNamesList
          const categoryIds = Categories.find({urlName: {$in: categoriesUrlNamesList}}).fetch().map( (v) => {return v._id} );
          // Find events in these categories and fetch for processing
          let events = Events.find({categoryId: {$in: categoryIds}}, {sort: {createdAt: -1}}).fetch();
          // Left join: fetch data from Categories and attach it to `category` property
          for (let i = 0; i < events.length; i++) {
            events[i].category = Categories.findOne({_id: events[i].categoryId});
          }
          return events;
        } else {
          return false;
        }
      },
    },
  });
  if (this.ready()) {
    this.render('list');
  } else {
    this.render('loading');
  };
}, {
  name: "search",
});
