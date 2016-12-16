import * as formControlFunctions from '/imports/ui/formControlFunctions.js';

export function onRendered(template) {
  template.$('select').select2({
    theme: "contemporary",
    ajax: {
      url: '/rest-api/users/select',
      type: "GET",
      dataType: "json",
      processResults: function (data) {
        return {results: data};
      },
      delay: 400
    },
  }).on("select2:open", function(event) {
    let target = $(event.target);
    formControlFunctions.focus(target);
  }).on("select2:close", function(event) {
    let target = $(event.target);
    formControlFunctions.blur(target);
  });
}
