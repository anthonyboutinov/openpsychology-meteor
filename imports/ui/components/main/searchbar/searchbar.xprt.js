export const clearSearchbarFields = function() {
  SessionStore.set('events.search.text', '');
  this.$("#search-filter-text").val("");

  SessionStore.set('events.search.dates.from', '');
  this.$("#search-filter-datepicker-from input").val("");

  SessionStore.set('events.search.dates.to', '');
  this.$("#search-filter-datepicker-to input").val("");
};
