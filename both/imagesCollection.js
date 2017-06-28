if (Meteor.isClient) {
  Meteor.subscribe('files.userFiles.all');
}

if (Meteor.isServer) {
  Meteor.publish('files.userFiles.all', function () {
    return UserFiles.collection.find({});
  });
}
