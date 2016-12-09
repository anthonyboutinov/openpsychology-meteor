import { Coaches } from '/imports/api/coaches/collection.js';

import './coach.modify.html';
import '/imports/ui/components/dashboard/coachesFormFieldset.js';


Template.dashboardCoachModify.helpers({
  Coaches() {
    return Coaches;
  },
});

let hooksObject = {
  before: {
    insert: function(doc) {
      doc.organizerId = this.formAttributes.organizerId;

      console.log(doc);
      return doc;
    },
    update: function(doc) {
      console.log(doc);
      return doc;
    },
  },
  onSuccess: function(formType, result) {
    Router.go('dashboard.organizer', {_id: this.formAttributes.organizerId});
  },
  onError: function(formType, error) {
    console.log(error);
  },
};
AutoForm.addHooks(['coachesForm'], hooksObject);
