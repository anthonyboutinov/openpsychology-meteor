import { Organizers } from '/imports/api/organizers/collection.js';

import './update.html';
import '/imports/ui/components/dashboard/organizersFormFieldset.js';

Template.dashboardOrganizersUpdate.helpers({
  Organizers() {
    return Organizers;
  },
  __tempSolution() {
    return !this.specialFormType;
  }
});

let hooksObject = {
  before: {
    update(doc) {
      if (doc.phoneNum) {
        doc.phoneNum = Phoneformat.cleanPhone(doc.phoneNum);
      }
      console.log(doc);
      return doc;
    },
  },
  onSuccess(formType, result) {
    Router.go('dashboard.organizer', {_id: this.formAttributes.doc._id});
  },
  onError(formType, error) {
    console.log(error);
  },
};
AutoForm.addHooks(['updateOrganizerForm'], hooksObject);
