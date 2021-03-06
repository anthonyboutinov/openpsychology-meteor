import { FormControlHelperMethods } from '/imports/lib/formControlHelperMethods.js';

export function onRendered(templateInstance){
  if (!templateInstance) {
    templateInstance = this;
  }

  templateInstance.$('select:not([data-minimumResultsForSearch="Infinity"])').select2({
    theme: "contemporary",
  }).on("select2:open", function(event) {
    let target = $(event.target);
    FormControlHelperMethods.focus(target);
  }).on("select2:close", function(event) {
    let target = $(event.target);
    FormControlHelperMethods.blur(target);
    // THIS IS DIFFERENT HERE:
    target.parents("form").submit();
    _.delay(onRendered, 300, templateInstance);
  });

  templateInstance.$('select[data-minimumResultsForSearch="Infinity"]').select2({
    theme: "contemporary",
    minimumResultsForSearch: Infinity,
  }).on("select2:open", function(event) {
    let target = $(event.target);
    FormControlHelperMethods.focus(target);
  }).on("select2:close", function(event) {
    let target = $(event.target);
    FormControlHelperMethods.blur(target);
    // THIS IS DIFFERENT HERE:
    target.parents("form").submit();
    _.delay(onRendered, 300, templateInstance);
  });

};

export const ev = {
  'blur .form-control'(event, template) {
    $(event.currentTarget).parents("form").submit();
  },
};
