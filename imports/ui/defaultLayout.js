Template.defaultLayout.events({
  "click #showSearchbar": function(event, template){
    if (this.showSearchbar) {
      event.preventDefault();
      Router.go(window.location.pathname);
    } else if (this.searchbarSupported) {
      event.preventDefault();
      Router.go(window.location.pathname + "?sb=true");
    } else {
      event.preventDefault();
      Router.go("/search/all?sb=true")
    }

  },
  // "click .hideSearchbar": function(event, template) {
  //   Router.go(Router.current().route.path(this) + "?sb=false");
  // }
});
