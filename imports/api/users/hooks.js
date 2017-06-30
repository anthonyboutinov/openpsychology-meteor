import { Organizers } from '/imports/api/organizers/collection.js';

Meteor.users.after.remove(function (userId, doc) {
  Organizers.remove({ownerId: userId});
}, {fetchPrevious: false});

Meteor.users.before.update(function (userId, doc, fieldNames, modifier, options) {


  console.log(userId, doc, fieldNames, modifier, options);
  //TODO: Safety checks!
  // // SAFETY CHECKS FOR SUPER ADMIN
  // if (_.indexOf(fieldNames, "userProfile.permissions"
  // const superaAmin = Meteor.users.findOne({ 'emails.address': 'anton4488@gmail.com' });
  // if (userId == superaAmin._id) {
  //   // ABORT ANY PERMISSION CHANGES
  //
  //   modifier.$set.userProfile.permissions =
  // }
}, {fetchPrevious: false});


Meteor.users.after.update(function (userId, doc, fieldNames, modifier, options) {
  console.log("----------Meteor.users.after.update--------------\n\n", userId, doc, fieldNames, modifier, options);
}, {fetchPrevious: false});
