import { Events } from '/imports/api/events/collection.js';

import './insert.html';

import '/imports/ui/autoform/contemporary/afFormGroup.js';
import '/imports/ui/autoform/datetimeRange.js';
import '/imports/ui/components/dashboard/eventsFormFieldset.js';
import * as formControlFunctions from '/imports/ui/formControlFunctions.js';


Template.dashboardOrganizerEventsAdd.helpers({
  Events: function() {
    return Events;
  },
  eventTemplateDoc: function() {
    return {
      location: this.organizer.location,
    }
  },
});

Template.dashboardOrganizerEventsAdd.onRendered(function(){

  this.$('select:not([data-minimumResultsForSearch="Infinity"])').select2({

    theme: "contemporary",
  }).on("select2:open", function(event) {
    let target = $(event.target);
    formControlFunctions.focus(target);
  }).on("select2:close", function(event) {
    let target = $(event.target);
    formControlFunctions.blur(target);
  });

  this.$('select[data-minimumResultsForSearch="Infinity"]').select2({

    theme: "contemporary",
    minimumResultsForSearch: Infinity,
  }).on("select2:open", function(event) {
    let target = $(event.target);
    formControlFunctions.focus(target);
  }).on("select2:close", function(event) {
    let target = $(event.target);
    formControlFunctions.blur(target);
  });

});


let hooksObject = {
  before: {
    insert: function(doc) {
      console.log("before: ", doc);

      if (doc.dates) {
        doc.dates = doc.dates.map(function(subdoc) {
          let raw = subdoc.dateFrom;
          let indexOfSeparator = raw.indexOf(" - ");
          if (indexOfSeparator < 0) return null;
          return {
            dateFrom: moment(raw.substring(0, indexOfSeparator), "DD.MM.YYYY HH:mm").toDate(),
            dateTo: moment(raw.substring(indexOfSeparator + 3), "DD.MM.YYYY HH:mm").toDate(),
            info: subdoc.info
          }
        });
        doc.dates.sort(function(a, b) {
          return (a.dateFrom > b.dateFrom) ? 1 : ((a.dateFrom < b.dateFrom )? -1 : 0);
        });
      }

      let organizer = this.formAttributes.organizer;
      doc.organizer = {
        _id: organizer._id,
        name: organizer.name,
      };
      if (organizer.imageUrl) {
        doc.organizer.imageUrl = organizer.imageUrl;
      }

      doc.createdAt = new Date();
      console.log("after: ", doc);
      return doc;
    },
  },
  onSuccess: function(formType, result) {
    Router.go('dashboard.organizer', _id=this.formAttributes.organizer);
  },
  onError: function(formType, error) {
    console.log(error);
  },
};
AutoForm.addHooks(['insertEventForm'], hooksObject);
