import { Events } from '/imports/api/events/collection.js';

import './update.html';

import '/imports/ui/autoform/contemporary/afFormGroup.js';
import '/imports/ui/autoform/datetimeRange.js';
import '/imports/ui/components/dashboard/eventsFormFieldset.js';
import * as formControlFunctions from '/imports/ui/formControlFunctions.js';


Template.dashboardOrganizerEventsUpdate.helpers({
  Events: function() {
    return Events;
  },
});

Template.dashboardOrganizerEventsUpdate.onRendered(function(){

  $('select').select2({
    placeholder: "Выберите",
    theme: "contemporary",
  }).on("select2:open", function(event) {
    let target = $(event.target);
    formControlFunctions.focus(target);
  }).on("select2:close", function(event) {
    let target = $(event.target);
    formControlFunctions.blur(target);
  });

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
