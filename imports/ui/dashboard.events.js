Template.dashboardEvents.helpers({
  shouldClearfix: function(index, grid) {
    return index != 0 && index % grid == 0;
  },

  ongoingClass: function() {
    return this.timeframe == "ongoing" ? "active" : false;
  },
  upcomingClass: function() {
    return this.timeframe == "upcoming" ? "active" : false;
  },
  pastClass: function() {
    return this.timeframe == "past" ? "active" : false;
  },
});
