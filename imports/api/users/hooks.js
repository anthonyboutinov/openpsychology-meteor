Meteor.users.after.remove(function (userId, doc) {
  Organizers.remove({ownerId: userId});
});
