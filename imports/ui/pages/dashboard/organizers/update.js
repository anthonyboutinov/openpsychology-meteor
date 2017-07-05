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
      if (doc.$set && doc.$set.phoneNum) {
        doc.$set.phoneNum = Phoneformat.cleanPhone(doc.$set.phoneNum);
      }
      if (doc.$set && doc.$set.ownerId && doc.$set.ownerId != this.currentDoc.ownerId) {
        // If we set new owner to be someone from the list of managedBy users, then remove this id from the list
        if (this.currentDoc.managedBy && this.currentDoc.managedBy.includes(doc.$set.ownerId)) {
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
        console.log({mb1: doc.$set.managedBy});
        if (doc.$set.managedBy === undefined) {
          doc.$set.managedBy = this.currentDoc.managedBy;
        }
        console.log({mb2: doc.$set.managedBy});
        if (!doc.$set.managedBy) {
          doc.$set.managedBy = [];
        }
        console.log({mb3: doc.$set.managedBy});
        doc.$set.managedBy.push(this.currentDoc.ownerId);
        console.log({mb4: doc.$set.managedBy});
      }
      console.log("after: ", doc);
      return doc;
    },
  },
  onSuccess(formType, result) {
    console.log(this);

    const didChangeOwner = this.updateDoc.$set && this.updateDoc.$set.ownerId;
    if (didChangeOwner && this.updateDoc.$set.ownerId != this.currentDoc.ownerId) {
      swal("Успешно!", "Права на огранизацию «" + this.currentDoc.name + "» переданы другому пользователю! Вы все еще являеесь участником. Если вы хотите покинуть организацию, удалите себя из списка участников.", "success");
    }

    if (didChangeOwner) {
      // TODO: This commented out line doesn't work right now for some reason.
      // Router.go('dashboard.organizer.update', {_id: this.formAttributes.doc._id, specialFormType: 'collaborators'});
      Router.go('dashboard.organizer', {_id: this.formAttributes.doc._id});
    } else {
      if (!this.updateDoc.$set.managedBy /*if did not update managers*/) {
        // Means performed ordinary update, so we go back
        Router.go('dashboard.organizer', {_id: this.formAttributes.doc._id});
      }
    }


  },
  onError(formType, error) {
    swal("Ошибка!", error, danger);
  },
};
AutoForm.addHooks(['updateOrganizerForm'], hooksObject);
