import { Categories } from '../../api/categories.js';

Router.configure({
  // the default layout
  layoutTemplate: 'defaultLayout'
});

Router.route('/', function () {
  this.subscribe('categories').wait();
  this.layout('defaultLayout', {
    data: {
      currentCategory: null,
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
  // var category;
  // if (this.params.category == "all") {
  //   // catetory = ...
  // } else {
  //   category = Categories.findOne({urlName: this.params.category});
  // }
  const categoryUrlName = this.params.categoryUrlName;
  this.layout('defaultLayout', {
    data: {
      currentCategory: () => { return Categories.findOne({urlName: categoryUrlName}) },
      searchbarSupported: true,
      showSearchbar: this.params.query.sb == "true",
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
