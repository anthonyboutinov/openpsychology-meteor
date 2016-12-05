import { Categories } from '/imports/api/categories';

import './searchbar.html';

import './searchbar_category.js';

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
    let currentUrlNamesArray = currentUrlNames == "none" ? [] : currentUrlNames.split("");
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
  },

  'keyup #search-filter-text, blur #search-filter-text': function(event, template) {
    const value = $(event.currentTarget).val();
    SessionStore.set('events.search.text', value);
  },

  'change #search-filter-datepicker-from input': function(event, template) {
    const value = $(event.currentTarget).val();
    SessionStore.set('events.search.dates.from', value);
  },

  'change #search-filter-datepicker-to input': function(event, template) {
    const value = $(event.currentTarget).val();
    SessionStore.set('events.search.dates.to', value);
  },
});

Template.searchbar.onRendered(function() {
  setTimeout(()=>{
    const flag = (this.data ? this.data.showSearchbar : false) || false;
    animateSearchbarOnAndOff(flag);
  }, 200);

  this.$("#search-filter-text").val(SessionStore.get('events.search.text'));
  this.$("#search-filter-datepicker-from input").val(SessionStore.get('events.search.date.from'));
  this.$("#search-filter-datepicker-to input").val(SessionStore.get('events.search.date.to'));

  this.$('#search-filter-datepicker-from').datepicker({
    maxViewMode: 2,
    format: 'dd.mm.yyyy',
    clearBtn: true,
    language: "ru",
    todayHighlight: true,
    autoclose: true,
    beforeShowYear: function (date){
      if (date.getFullYear() < 2016) {
        return false;
      }
    }
  }).on('clearDate', function() {
    SessionStore.set('events.search.dates.from', '');
  });

  this.$('#search-filter-datepicker-to').datepicker({
    maxViewMode: 2,
    format: 'dd.mm.yyyy',
    clearBtn: true,
    language: "ru",
    todayHighlight: true,
    autoclose: true,
    beforeShowYear: function (date){
      if (date.getFullYear() < 2016) {
        return false;
      }
    }
  }).on('clearDate', function() {
    SessionStore.set('events.search.dates.to', '');
  });
});
