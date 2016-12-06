Router.route('/files/ics/:eventId', function () {

  let event = Meteor.call("event", this.params.eventId);
  // console.log(event);

  this.response.setHeader('Content-disposition', 'attachment; filename=' + event._id + '.ics');
  this.response.setHeader('Content-type', 'text/calendar; charset=utf-8');

  let events = event.dates.map(function(daterange) {

    let organizer = "\\nОрганизатор: " + event.organizer.name;
    let cost = "\\nСтоимость: " + (event.price.sale ? event.price.sale : event.price.regular) + " руб.";
    let info = (daterange.info ? "\\n\\nИнформация от организатора:\\n" + daterange.info : "");

    var location = event.location.city + ", " + event.location.line1;
    if (event.location.additionalInfo) {
      location += ", " + event.location.additionalInfo;
    }

    console.log(location);
    return {
      uid: event._id + daterange.dateFrom.toString(),
      summary: event.title + ", " + event.category.singularName,
      dtStart: daterange.dateFrom,
      dtEnd: daterange.dateTo,
      description: "Скачано с сайта «Открытая психология»\\n" + organizer + cost + info + "\\nМесто: " + location,
      location: location,
      url: "http://localhost:3000/event/" + event._id,
    }
  });

  // generate entire object at once
  var calOptions = {
      prodId: event._id+ "openspychology.boutinov",
      method: "REQUEST",
      URL: "http://localhost:3000/event/" + event._id,
      version: "2.0",
      description: "Календарь для " + event.category.singularName + " «" + event.title + "» от "
        + event.organizer.name + ", опубликован на сайте Открытая психология",
      events: events
  };
  var cal = new IcsGenerator(calOptions);

  // console.log(this.response);

  // get output
  this.response.end(cal.toIcsString());
}, {where: 'server'});
