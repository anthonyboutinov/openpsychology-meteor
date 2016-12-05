import './footer.html';

Template.footer.helpers({
  footerClass: function() {
    console.log(new Date(), this);
    if (this.type == "dashboard") {
      return "navbar-light";
    } else {
      return "navbar-inverse";
    }
  },
  containerClass: function() {
    if (this.type == "dashboard") {
      return "container-fluid";
    } else {
      return "container";
    }
  },
});
