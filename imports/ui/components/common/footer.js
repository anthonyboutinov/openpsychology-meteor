import './footer.html';

Template.footer.helpers({
  footerClass: function() {
    if (this.type == "dashboardLayout" || this.ultraCompact) {
      return "footer-light";
    } else {
      return "footer-dark";
    }
  },
  logoAsset: function() {
    if (this.type == "dashboardLayout" || this.ultraCompact) {
      return "logo-dark.png";
    } else {
      return "logo.png";
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
