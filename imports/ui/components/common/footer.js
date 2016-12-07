import './footer.html';

Template.footer.helpers({
  footerClass: function() {
    if (this.type == "dashboard" || this.ultraCompact) {
      return "footer-light";
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
