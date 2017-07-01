import { Organizers } from './collection.js';

// security methods
//
//
Security.defineMethod('ifManagesOrganizer', {
  fetch: [],
  transform: null,
  allow(type, arg, userId, doc) {
    return userId && (doc.ownerId === userId || _.contains(doc.managedBy, userId));
  },
});


// admin permission
//
//
Organizers.permit(['insert', 'update', 'remove']).ifHasRole({role:'admin', group: Roles.GLOBAL_GROUP}).allowInClientCode();



// general permissions
//
//
Organizers.permit('insert').ifLoggedIn().allowInClientCode();
Organizers.permit('update').ifOwns().allowInClientCode();
Organizers.permit('update').ifManagesOrganizer().exceptProps(['ownerId']).allowInClientCode();
Organizers.permit('remove').ifOwns().allowInClientCode();
