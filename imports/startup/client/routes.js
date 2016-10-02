Router.configure({
  // the default layout
  layoutTemplate: 'defaultLayout'
});

Router.route('/', function () {
  this.layout('defaultLayout');
  this.render('home');
});

Router.route('/list', function () {
  this.layout('defaultLayout');
  this.render('list');
});

Router.route('/search', function() {
  this.layout('defaultLayout', {
    data: {
      showSearchbar: true
    },
  });
  this.render('list');
})
