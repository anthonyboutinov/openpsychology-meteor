const _nearestUpcomingDate = function(dates) {
  const now = (new Date()).getTime();
  let foundDate;
  dates.forEach(function(date) {
    if (!foundDate) {
      if (date.dateFrom.getTime() - now > 0) {
        foundDate = date.dateFrom;
      }
    }
  });
  if (!foundDate) {
    foundDate = dates[dates.length - 1].dateFrom;
  }
  return foundDate;
}

Template.list_item.helpers({
  nbsp: function(str) {
    return str.replace(/&nbsp;/g, '\u00a0');
  },
  nearestUpcomingDate: function() {
    const date = _nearestUpcomingDate(this.event.dates);
    const now = new Date();
    // let label = "";
    // if (date < now) {
    //   label = "Закончилось ";
    // }
    return moment(date).format('llll');
  },
  calenderDate: function() {
    const date = _nearestUpcomingDate(this.event.dates);
    return moment(date).fromNow();
  },
  // dateStatus: function() {
  //   const date = _nearestUpcomingDate(this.event.dates);
  //   const now = new Date();
  //   if (date < now) {
  //     return '<i class="fa fa-fw fa-stop text-hint" aria-hidden="true" data-toggle="tooltip" data-delay="250" title="Мероприятие закончилось. Последняя встреча была ' + moment(date).calendar() + '"></i><span class="sr-only">Мероприятие закончилось. Последняя встреча была </span>';
  //   } else
  //   // If more than one calendar events and the first one in the array
  //   // is not the one that _nearestUpcomingDate returned,
  //   // then it means that the course is currently in progress.
  //   if (this.event.dates.length > 1 && this.event.dates[0].dateFrom.getTime() != date) {
  //     return '<i class="fa fa-fw fa-play text-info" aria-hidden="true" data-toggle="tooltip" data-delay="250" title="Первая встреча была в прошлом. Следующая встреча ' + moment(date).calendar() + '"></i><span class="sr-only">Первая встреча была в прошлом. Следующая встреча </span>';
  //   } else {
  //     return '<i class="fa fa-fw fa-calendar-o text-success" aria-hidden="true"></i><span class="sr-only">Состоится </span>';
  //   }
  // },
  dateInProgressClass: function() {
    const date = _nearestUpcomingDate(this.event.dates);
    const now = new Date();
    // If more than one calendar events and the first one in the array
    // is not the one that _nearestUpcomingDate returned,
    // then it means that the course is currently in progress.
    if (date >= now && this.event.dates.length > 1 && this.event.dates[0].dateFrom.getTime() != date) {
      return "list-item-date-in-progress";
    } else {
      return null;
    }
  },
  eventHasPassed: function() {
    const date = _nearestUpcomingDate(this.event.dates);
    const now = new Date();
    return (date < now);
  },
  eventIsInProgress: function() {
    const date = _nearestUpcomingDate(this.event.dates);
    // If more than one calendar events and the first one in the array
    // is not the one that _nearestUpcomingDate returned,
    // then it means that the course is currently in progress.
    return (date >= new Date() && this.event.dates.length > 1 && this.event.dates[0].dateFrom.getTime() != date);
  },
  eventProgressPercentage: function() {
    const date = _nearestUpcomingDate(this.event.dates);
    for (let i = 0; i < this.event.dates.length; i++) {
      if (this.event.dates[i].dateFrom.getTime() == date.getTime()) {
        return (i / this.event.dates.length * 100).toFixed(0); // 0 decimal places
      }
    }
  },
  eventProgressCalEventsFinished: function() {
    const date = _nearestUpcomingDate(this.event.dates);
    for (let i = 0; i < this.event.dates.length; i++) {
      if (this.event.dates[i].dateFrom.getTime() == date.getTime()) {
        return i;
      }
    }
  },


  priceLabel: function() {
    const sale = this.event.price.sale;
    if (sale != null) {
      return sale == 0 ? "Бесплатно" : sale + "₽";
    } else {
      const regular = this.event.price.regular;
      return regular == 0 ? "Бесплатно" : regular + "₽";
    }
  },
  priceBg: function() {
    const sale = this.event.price.sale;
    if (sale != null) {
      return "bg-success";
    } else {
      const regular = this.event.price.regular;
      return regular == 0 ? "bg-success" : "bg-hint";
    }
  },
});


Template.list_item.onRendered(function() {
  this.$("[data-toggle='tooltip']").tooltip();
});
