import './editAny.html';
import { formatDateFn, formatUserFn} from '/imports/lib/reactiveTableHelpers.js';

Template.adminEditAny.helpers({
  formatDate: formatDateFn,
  formatUser: formatUserFn,
});

Template.adminEditAny.events({
  "click [bc-action='goback']"(event, template) {
    history.back();
  },
});

let hooksObject = {
  before: {
    // insert: function(doc) {
    //   doc.organizerId = this.formAttributes.organizerId;
    //
    //   console.log(doc);
    //   return doc;
    // },
    update: function(doc) {
      console.log(doc);
      return doc;
    },
  },
  onSuccess: function(formType, result) {
    history.back();
  },
  onError: function(formType, error) {
    alert.log(error);
  },
};
AutoForm.addHooks(['adminEditAnyForm'], hooksObject);
