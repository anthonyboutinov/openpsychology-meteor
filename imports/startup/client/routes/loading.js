/*
----------------------------
Loading route
----------------------------
*/
Router.route('/__loading/:layout?', function() {
  const layout = this.params.layout;
  if (layout) {
    this.layout(layout);
  }
  this.render('loading');
});
