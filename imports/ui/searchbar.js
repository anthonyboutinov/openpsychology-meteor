import { Categories } from '../api/categories.js';

let animateSearchbarOnAndOff = function(showSearchbar) {
  if (showSearchbar) {
    this.$(".animated-slide-down").css("max-height", this.$(".animated-slide-down")[0].scrollHeight); // TODO: requires update on window resize
    this.$("#search").focus();
  } else {
    this.$(".animated-slide-down").css("max-height", 0); // TODO: requires update on window resize
  }
}

Template.searchbar.helpers({
  'showSearchbarActive': function() {
    try {
      animateSearchbarOnAndOff(this.showSearchbar);
    } catch (err) {
      // Do nothing.
      // The error will always occur when the template is being loaded but is not yet rendered.
    }

    return this.showSearchbar;
  },
  "categories": function() {
    return Categories.find({}, {sort: {order: 1}});
  },
});

Template.searchbar.events({
  'click [sb-toggle-category-urlName]': function(event, template) {
    event.preventDefault();
    const thisUrlName = $(event.currentTarget).attr("sb-toggle-category-urlName");

    const pathname = window.location.pathname;
    const indexOfLastSlash = pathname.lastIndexOf("/") + 1;
    const currentUrlNames = pathname.substring(indexOfLastSlash);
    let currentUrlNamesArray = currentUrlNames == "none" ? [] : currentUrlNames == "all" ? "teos".split("") : currentUrlNames.split(""); // FIXME: "teos" is a bad design
    if (currentUrlNamesArray.length == 0) {
      const leftPathname = pathname.substring(0, indexOfLastSlash);
      Router.go(leftPathname + thisUrlName + window.location.search);
    } else if (currentUrlNamesArray.indexOf(thisUrlName) == -1) {
      Router.go(pathname + thisUrlName + window.location.search);
    } else {
      const leftPathname = pathname.substring(0, indexOfLastSlash);
      currentUrlNamesArray = currentUrlNamesArray.filter((value) => {return value != thisUrlName});
      const rightPathName = currentUrlNamesArray.length ? currentUrlNamesArray.join("") : "none";
      Router.go(leftPathname + rightPathName + window.location.search);
    }
  }
});

Template.searchbar.onRendered(function() {
  animateSearchbarOnAndOff(this.showSearchbar);

  this.$('#filter-datepicker').datepicker({
    maxViewMode: 2,
    format: 'dd.mm.yyyy',
    startDate: '0d',
    clearBtn: true,
    language: "ru",
    todayHighlight: true,
    beforeShowYear: function (date){
      if (date.getFullYear() < 2016) {
        return false;
      }
    }
  });
});
