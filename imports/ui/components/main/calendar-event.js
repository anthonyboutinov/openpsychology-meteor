import './calendar-event.html';

Template.calendarEvent.helpers({
  formatedDate: function(date) {
    return moment(date).format('llll');
  },
  calenderDate: function(date) {
    return moment(date).calendar();
  },

  class: function() {
    const now = new Date();
    if (this.event.dateFrom < now) {
      return "calendar-event-passed";
    } else if (this.allCalEvents.length == 1) {
      return "calendar-event-upcoming";
    } else {
      let pastEventsAreProcessed = false;
      let thisDate = this.event.dateFrom;
      for (let i = 0; i < this.allCalEvents.length; i++) {
        const ithDate = this.allCalEvents[i].dateFrom;
        if (!pastEventsAreProcessed && ithDate >= now) {
          pastEventsAreProcessed = true;
          if (thisDate.getTime() == ithDate.getTime()) {
            return "calendar-event-next";
          }
        }
      }
      return "calendar-event-upcoming";
    }
  },
  relativeDateSR: function() {
    const now = new Date();
    if (this.event.dateFrom < now) {
      return "Встреча была ";
    } else if (this.allCalEvents.length == 1) {
      return null;
    } else {
      let pastEventsAreProcessed = false;
      let thisDate = this.event.dateFrom;
      for (let i = 0; i < this.allCalEvents.length; i++) {
        const ithDate = this.allCalEvents[i].dateFrom;
        if (!pastEventsAreProcessed && ithDate >= now) {
          pastEventsAreProcessed = true;
          if (thisDate.getTime() == ithDate.getTime()) {
            return "Ближайшая встреча будет ";
          }
        }
      }
      return null;
    }
  },
  relativeDate: function() {
    const label = moment(this.event.dateFrom).fromNow();
    return label.charAt(0).toUpperCase() + label.slice(1);
  },
  absoluteDate: function() {
    const m = moment(this.event.dateFrom);
    let dd = m.format("dd");
    dd = dd.charAt(0).toUpperCase() + dd.slice(1);
    return dd + ", " + m.format('LL');
  },
  time: function() {
    return "<span class='sr-only'>C </span>" + moment(this.event.dateFrom).format("LT") + " –<span class='sr-only'> до</span> " + moment(this.event.dateTo).format("LT");
  },
  duration: function() {
    const difference = moment(this.event.dateTo).diff(moment(this.event.dateFrom), 'hours', true);
    const roundPart = Math.floor(difference);
    const remainder = difference - roundPart;
    let fraction;
    let hoursLabel = " часа";
    if (remainder == 0) {
      fraction = "";
      if (roundPart % 10 >= 5 || roundPart % 10 == 0) {
        hoursLabel = " часов";
      }
    } else if (remainder == 0.5) {
      fraction = "½";
    } else if (remainder == 0.25) {
      fraction = "¼";
    } else if (remainder == 0.75) {
      fraction = "¾";
    } else {
      return moment(this.event.dateTo).diff(moment(this.event.dateFrom), 'hours') + "ч " + moment(this.event.dateTo).diff(moment(this.event.dateFrom), 'minutes') + "м";
    }
    return roundPart + fraction + hoursLabel;
  },
  eventIsInTheFuture: function() {
    return this.event.dateFrom > new Date();
  },
});
