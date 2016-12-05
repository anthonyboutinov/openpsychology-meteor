import './events.html';

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

  panelLabel: function() {
    switch(this.timeframe) {
      case "ongoing": return "Текущие";
      case "upcoming": return "Предстоящие";
      case "past": return "Завершенные";
      default: return null
    }
  },
  panelLabelLowercase: function() {
    switch(this.timeframe) {
      case "ongoing": return "текущие";
      case "upcoming": return "предстоящие";
      case "past": return "завершенные";
      default: return null
    }
  }
});
