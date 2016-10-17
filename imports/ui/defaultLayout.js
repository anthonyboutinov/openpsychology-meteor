Template.defaultLayout.events({
  "click #showSearchbar": function(event, template){
    if (this.searchbarSupported) {
      event.preventDefault();
      Router.go(Router.current().route.path(this) + "?sb=true");
    } else {
      event.preventDefault();
      Router.go("/search/all?sb=true")
    }

  },
  "click .hideSearchbar": function(event, template) {
    Router.go(Router.current().route.path(this) + "?sb=false");
  }
});
