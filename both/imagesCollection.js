if (Meteor.isClient) {
  Meteor.subscribe('files.userFiles.all');
}

if (Meteor.isServer) {
  Meteor.publish('files.userFiles.all', function () {
    return UserFiles.collection.find({});
  });

  // UserFiles.permit(['insert', 'update', 'remove']).ifHasRole({role:'admin', group: Roles.GLOBAL_GROUP});
  //
  // UserFiles.permit('insert').ifLoggedIn();
  // UserFiles.permit('update').ifManagesUserFile();
  // UserFiles.permit('remove').ifManagesUserFile();
  //
  // // security methods
  // //
  // //
  // Security.defineMethod('ifManagesUserFile', {
  //   fetch: [],
  //   transform: null,
  //   allow(type, arg, userId, doc) {
  //     const event =
  //     const organizer = Organizers.findOne(doc.organizerId, {fields: {ownerId: 1, managedBy: 1}});
  //     const  organizer && userId && (organizer.ownerId === userId || _.contains(organizer.managedBy, userId));
  //   },
  // });

}
