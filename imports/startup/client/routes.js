Router.configure({
  // the default layout
  layoutTemplate: 'defaultLayout'
});

Router.route('/', function () {
  this.layout('defaultLayout');
  this.render('home');
  this.render('navbar', {to: 'navbar'});
  this.render('footer', {to: 'footer'});
});

Router.route('/list', function () {
  this.layout('defaultLayout');
  this.render('list');
  this.render('navbar', {to: 'navbar'});
  this.render('footer', {to: 'footer'});
});
