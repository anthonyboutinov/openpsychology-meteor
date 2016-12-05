export const clearSearchbarFields = function() {
  SessionStore.set('events.search.text', '');
  $("#search-filter-text").val("");

  SessionStore.set('events.search.dates.from', '');
  $("#search-filter-datepicker-from input").val("");

  SessionStore.set('events.search.dates.to', '');
  $("#search-filter-datepicker-to input").val("");
};
