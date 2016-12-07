import { check } from 'meteor/check';

//
// Meteor.users = function (doc) {
//   _.extend(this, doc);
// };
//
// Meteor.users.prototype = {
//   constructor: Meteor.users,
//
//   profileUsernameUpdate(value)
// };




Meteor.methods({

  'user.confirmPassword': function(digest) {
    if (this.userId) {
      var user = Meteor.user();
      var password = {digest: digest, algorithm: 'sha-256'};
      var result = Accounts._checkPassword(user, password);
      return result.error == null;
    } else {
      return false;
    }
  },

  'user.profile.name.update'(value) {
    check(value, String);
    check(this.userId, String);
    return Meteor.users.update({ _id: Meteor.userId() }, {$set: {"profile.name": value}});
  },

});
