import { Coaches } from '/imports/api/coaches/collection.js';

import './coach.modify.html';

import '/imports/ui/autoform/contemporary/afFormGroup.js';
import '/imports/ui/autoform/datetimeRange.js';
import '/imports/ui/components/dashboard/coachesFormFieldset.html';
import * as formControlFunctions from '/imports/ui/formControlFunctions.js';


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
    console.log(this);
    Router.go('dashboard.organizer', _id=this.formAttributes.organizerId);
  },
  onError: function(formType, error) {
    console.log(error);
  },
};
AutoForm.addHooks(['coachesForm'], hooksObject);
