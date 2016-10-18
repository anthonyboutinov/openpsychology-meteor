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
          const categoryIds = Categories.find({urlName: {$in: categoriesUrlNamesList}}).fetch().map( (v) => {return v._id} );
          console.log(categoryIds);
          const events = Events.find({categoryId: {$in: categoryIds}}, {sort: {createdAt: -1}});
          console.log(events.fetch());
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
