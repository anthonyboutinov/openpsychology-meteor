import { Coaches } from './collection.js';
import { Organizers } from '/imports/api/organizers/collection.js';

// security methods
//
//
Security.defineMethod('ifOwnsCoach', {
  fetch: [],
  transform: null,
  allow(type, arg, userId, doc) {
    const organizer = Organizers.findOne(doc.organizerId, {fields: {ownerId: 1, managedBy: 1}});
    return organizer && userId && (organizer.ownerId === userId || _.contains(organizer.managedBy, userId));
  },
});



// admin permission
//
//
Coaches.permit(['insert', 'update', 'remove']).ifHasRole({role:'admin', group: Roles.GLOBAL_GROUP}).allowInClientCode();



// general permissions
//
//
Coaches.permit('insert').ifLoggedIn().allowInClientCode();
Coaches.permit('update').ifOwnsCoach().exceptProps(['organizerId']).allowInClientCode();
Coaches.permit('remove').ifOwnsCoach().allowInClientCode();
