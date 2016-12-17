import './update.html';

import { Organizers } from '/imports/api/organizers/collection.js';
import '/imports/ui/components/dashboard/organizersForms';

Template.dashboardOrganizersUpdate.helpers({
  Organizers() {
    return Organizers;
  },
});

let hooksObject = {
  before: {
    update(doc) {
      console.log(this);
      console.log("before: ", doc);
      if (doc.$set.phoneNum) {
        doc.$set.phoneNum = Phoneformat.cleanPhone(doc.$set.phoneNum);
      }
      if (doc.$set.ownerId && doc.$set.ownerId != this.currentDoc.ownerId) {
        // If we set new owner to be someone from the list of managedBy users, then remove this id from the list
        if (this.currentDoc.managedBy.includes(doc.$set.ownerId)) {
          if (doc.$set.managedBy === undefined) {
            // If there are no changes to the list of managedBy users,
            // Initialize it but without this new ownerId
            doc.$set.managedBy = _.without(this.currentDoc.managedBy, doc.$set.ownerId);
          } else {
            // Else remove from the list this new ownerId
            doc.$set.managedBy = _.without(doc.$set.managedBy, doc.$set.ownerId);
          }
        }

        // Add old ownerId to managedBy users list
        //
        if (doc.$set.managedBy === undefined) {
          doc.$set.managedBy = this.currentDoc.managedBy;
        }
        doc.$set.managedBy.push(this.currentDoc.ownerId);
      }
      console.log("after: ", doc);
      return doc;
    },
  },
  onSuccess(formType, result) {
    console.log(this);

    if (this.updateDoc.$set.ownerId && this.updateDoc.$set.ownerId !=this.currentDoc.ownerId) {
      swal("Успешно!", "Права на огранизацию «" + this.currentDoc.name + "» переданы другому пользователю!", "success");
    }

    Router.go('dashboard.organizer', {_id: this.formAttributes.doc._id});
  },
  onError(formType, error) {
    console.log(error);
  },
};
AutoForm.addHooks(['updateOrganizerForm'], hooksObject);
