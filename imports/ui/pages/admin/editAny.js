import './editAny.html';

// in:
// collection
// doc

// Template.adminEditAny.helpers({
// });

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
