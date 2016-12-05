import { Events } from '../api/events.js';

Template.dashboardOrganizerEventsUpdate.helpers({
  Events: function() {
    return Events;
  },
});

let hooksObject = {
  // Called whenever `doc` attribute reactively changes, before values
  // are set in the form fields. `ss` is SimpleSchema.
  docToForm: function(doc, ss) {
    console.log("before: ", doc, ss);
    if (doc.dates) {
      doc.dates = doc.dates.map(function(subdoc) {
        if (typeof(subdoc.dateFrom) == "string") {
          console.log("No changes to dates subdocs", subdoc);
          return subdoc;
        }
        let combinedFormattedDateString = moment(subdoc.dateFrom).format("DD.MM.YYYY HH:mm") + " - " +
                                          moment(subdoc.dateTo).format("DD.MM.YYYY HH:mm");
        return {
          dateFrom: combinedFormattedDateString,
          dateTo: "",
          info: subdoc.info
        }
      });
    }
    console.log("after: ", doc, ss);
    return doc;
  },
  before: {
    update: function(doc) {
      // console.log("before: ", doc);

      if (doc.$set.dates) {
        doc.$set.dates = doc.$set.dates.map(function(subdoc) {
          let raw = subdoc.dateFrom;
          let indexOfSeparator = raw.indexOf(" - ");
          if (indexOfSeparator < 0) return null;
          return {
            dateFrom: moment(raw.substring(0, indexOfSeparator), "DD.MM.YYYY HH:mm").toDate(),
            dateTo: moment(raw.substring(indexOfSeparator + 3), "DD.MM.YYYY HH:mm").toDate(),
            info: subdoc.info
          }
        });
        doc.$set.dates.sort(function(a, b) {
          return (a.dateFrom > b.dateFrom) ? 1 : ((a.dateFrom < b.dateFrom )? -1 : 0);
        });
      }

      // console.log("after: ", doc);
      return doc;
    },
  },
  onSuccess: function(formType, result) {
    Router.go('dashboard.organizer.events', _id=this.formAttributes.doc.organizer._id);
  },
  onError: function(formType, error) {
    console.log(error);
  },
};
AutoForm.addHooks(['updateEventForm'], hooksObject);
