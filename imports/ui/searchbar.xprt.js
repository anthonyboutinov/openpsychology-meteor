export const clearSearchbarFields = function() {
  SessionStore.unset('events.search.text');
  $("#search-filter-text").val("");

  SessionStore.unset('events.search.date.from');
  $("#search-filter-datepicker-from input").val("");

  SessionStore.unset('events.search.date.to');
  $("#search-filter-datepicker-to input").val("");
};
