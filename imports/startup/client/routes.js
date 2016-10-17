Router.configure({
  // the default layout
  layoutTemplate: 'defaultLayout'
});

Router.route('/', function () {
  this.layout('defaultLayout');
  this.render('home');
});

Router.route('/search/:category', function() {
  // var category;
  // if (this.params.category == "all") {
  //   // catetory = ...
  // } else {
  //   category = Categories.findOne({urlName: this.params.category});
  // }
  var category = "t";
  this.layout('defaultLayout', {
    data: {
      category: category,
      searchbarSupported: true,
      showSearchbar: this.params.query.sb,
    },
  });
  this.render('list');
});
