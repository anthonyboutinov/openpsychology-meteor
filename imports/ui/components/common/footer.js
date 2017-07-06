import './footer.html';

Template.footer.helpers({
  footerClass: function() {
    if (this.type == "dashboardLayout" || this.ultraCompact) {
      return "light";
    } else {
      return "dark";
    }
  },
  footerIsLight: function() {
    return (this.type == "dashboardLayout" || this.ultraCompact);
  },
  containerClass: function() {
    if (this.type == "dashboardLayout") {
      return "container-fluid";
    } else {
      return "container";
    }
  },
});
