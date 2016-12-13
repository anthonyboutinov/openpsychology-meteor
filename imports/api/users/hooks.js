Meteor.users.after.remove(function (userId, doc) {
  Organizers.remove({managedBy: {userId: doc._id, nonRetireable: true}});
});
