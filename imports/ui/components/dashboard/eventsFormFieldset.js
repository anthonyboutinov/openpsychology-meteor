import './eventsFormFieldset.html';

import * as formControlFunctions from '/imports/ui/formControlFunctions.js';

Template.eventsFormFieldset.onRendered(function(){

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
