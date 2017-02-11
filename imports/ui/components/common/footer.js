import './footer.html';

Template.footer.helpers({
  footerClass: function() {
    if (this.type == "dashboardLayout" || this.ultraCompact) {
      return "footer-light";
    } else {
      return "footer-dark";
    }
  },
  containerClass: function() {
    if (this.type == "dashboardLayout") {
      return "container-fluid";
    } else {
      return "container";
    }
  },
});
