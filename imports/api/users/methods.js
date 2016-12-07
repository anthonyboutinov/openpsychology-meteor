if (Meteor.isServer) {

//
// Meteor.users = function (doc) {
//   _.extend(this, doc);
// };
//
// Meteor.users.prototype = {
//   constructor: Meteor.users,
//
// };

  import { check } from 'meteor/check';

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

    'user.profile.systemNotifications.remove'(title) {
      check(title, String);
      check(this.userId, String);
      // unsetSpecifier = {};
      // unsetSpecifier["profile.settings." + field] = "";
      return Meteor.users.update({ _id: Meteor.userId() }, {$pull: {"profile.systemNotifications": title}});
    },

  });

}
