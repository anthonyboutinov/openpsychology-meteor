import { FormControlHelperMethods } from '/imports/lib/formControlHelperMethods.js';

export const Select2 = {

  onRenderedSetup() {

    this.$('select:not([data-minimumResultsForSearch="Infinity"])').select2({
      theme: "contemporary",
    }).on("select2:open", function(event) {
      let target = $(event.target);
      FormControlHelperMethods.focus(target);
    }).on("select2:close", function(event) {
      let target = $(event.target);
      FormControlHelperMethods.blur(target);
    });

    this.$('select[data-minimumResultsForSearch="Infinity"]').select2({
      theme: "contemporary",
      minimumResultsForSearch: Infinity,
    }).on("select2:open", function(event) {
      let target = $(event.target);
      FormControlHelperMethods.focus(target);
    }).on("select2:close", function(event) {
      let target = $(event.target);
      FormControlHelperMethods.blur(target);
    });

  }

}
