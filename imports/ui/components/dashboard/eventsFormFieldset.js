import './eventsFormFieldset.html';

import '/imports/ui/autoform/contemporary/afFormGroup.js';
import '/imports/ui/autoform/datetimeRange.js';
import '/imports/ui/autoform/boolean-radios.js';
import * as formControlFunctions from '/imports/lib/formControlFunctions.js';

Template.eventsFormFieldset.onRendered(function(){

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
