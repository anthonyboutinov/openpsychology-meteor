import './events.html';

Template.dashboardEvents.helpers({
  panelLabel: function() {
    if (this.timeframe) {
      switch(this.timeframe) {
        case "ongoing": return "Текущие";
        case "upcoming": return "Предстоящие";
        case "past": return "Завершенные";
        default: return null
      }
    } else if(this.group == "liked") {
      return "Лайки";
    } else if(this.group == "bookmarked") {
      return "Закладки";
    }
  },
  panelLabelLowercase: function() {
    switch(this.timeframe) {
      case "ongoing": return "текущие";
      case "upcoming": return "предстоящие";
      case "past": return "завершенные";
      default: return null
    }
  },
  groupIs: function(str) {
    return this.group == str;
  }
});
