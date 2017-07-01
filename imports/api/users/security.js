// security methods
//
//
Security.defineMethod('ifSelf', {
  fetch: [],
  transform: null,
  allow(type, arg, userId, doc) {
    console.log({type, arg, userId, doc});
    return userId && (doc._id === userId);
  },
});


// admin permission
//
//
Meteor.users.permit(['insert', 'update', 'remove']).ifHasRole({role:'super-admin', group: Roles.GLOBAL_GROUP}).allowInClientCode();

// WARNING: Will not allow ordinary admins to change user roles
Meteor.users.permit(['insert', 'update', 'remove']).ifHasRole({role:'admin', group: Roles.GLOBAL_GROUP}).exceptProps(['roles']).allowInClientCode();



// general permissions
//
//
// Meteor.users.permit('insert').ifLoggedIn().allowInClientCode();
Meteor.users.permit('update').ifSelf().onlyProps(['profile', 'appSpecific']).allowInClientCode();
Meteor.users.permit('remove').ifSelf().allowInClientCode();
