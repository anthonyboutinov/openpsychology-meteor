import { Events } from './collection.js';
import { Organizers } from '/imports/api/organizers/collection.js';

// security methods
//
//
Security.defineMethod('ifManagesEvent', {
  fetch: [],
  transform: null,
  allow(type, arg, userId, doc) {
    if (!userId) return false;
    const managedOrganizers = Organizers.find({
      $or: [
        {ownerId: userId},
        {managedBy: userId}
      ]
    }, {fields: {_id: 1}}).map(function(doc){return doc._id});
    return _.contains(managedOrganizers, doc.organizerId);
  },
});



// admin permission
//
//
Events.permit(['insert', 'update', 'remove']).ifHasRole({role:'admin', group: Roles.GLOBAL_GROUP}).allowInClientCode();



// general permissions
//
//
Events.permit('insert').ifLoggedIn().allowInClientCode();
Events.permit('update').ifLoggedIn().onlyProps(['registeredForEvent', 'bookmarks', 'likes']).allowInClientCode(); // TODO: specify
Events.permit('update').ifManagesEvent().exceptProps(['likes', 'bookmarks']).allowInClientCode();
Events.permit('remove').ifManagesEvent().allowInClientCode();
