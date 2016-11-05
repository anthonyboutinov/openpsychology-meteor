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
  nearestUpcomingDate: function(dates) {
    const date = _nearestUpcomingDate(dates);
    const now = new Date();
    // let label = "";
    // if (date < now) {
    //   label = "Закончилось ";
    // }
    return moment(date).format('llll');
  },
  calenderDate: function(dates) {
    const date = _nearestUpcomingDate(dates);
    return moment(date).calendar();
  },
  dateStatus: function(dates) {
    const date = _nearestUpcomingDate(dates);
    const now = new Date();
    if (date < now) {
      return '<i class="fa fa-fw fa-stop text-hint" aria-hidden="true" data-toggle="tooltip" data-delay="250" title="Мероприятие закончилось. Последняя встреча была ' + moment(date).calendar() + '"></i><span class="sr-only">Мероприятие закончилось. Последняя встреча была </span>';
    } else
    // If more than one calendar events and the first one in the array
    // is not the one that _nearestUpcomingDate returned,
    // then it means that the course is currently in progress.
    if (dates.length > 1 && dates[0].dateFrom.getTime() != date) {
      return '<i class="fa fa-fw fa-play text-info" aria-hidden="true" data-toggle="tooltip" data-delay="250" title="Первая встреча была в прошлом. Следующая встреча ' + moment(date).calendar() + '"></i><span class="sr-only">Первая встреча была в прошлом. Следующая встреча </span>';
    } else {
      return '<i class="fa fa-fw fa-calendar-o text-success" aria-hidden="true"></i><span class="sr-only">Состоится </span>';
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
