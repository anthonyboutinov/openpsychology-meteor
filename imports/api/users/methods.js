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

    'user.confirmPassword'(digest) {
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

    'user.appSpecific.systemNotifications.remove'(title) {
      check(title, String);
      check(this.userId, String);
      // unsetSpecifier = {};
      // unsetSpecifier["profile.settings." + field] = "";
      console.log(title);
      return Meteor.users.update({ _id: Meteor.userId() }, {$pull: {"appSpecific.systemNotifications": title}});
    },

    'user.remove'() {
      if (!this.userId) {
        console.log("USER.REMOVE no this.userId");
        return false;
      }
      if (this.userId) {
        check(this.userId, String);
      }

      console.log("USER.REMOVE");

      /*
       * Excerpt from https://github.com/meteor/meteor/issues/4263#issuecomment-97258327:
       *
       * First, you remove the record from the database. Then you make a call that yields (setUserId yields
       * because it has to re-run all publishers with the new ID). During the yield, the background observe
       * thread notices that the user object is gone and disconnects the connection. The client sees this
       * and reconnects; because the removeUser method was in flight and never got a response, it runs it again.

       * The automatic disconnection of invalid connections is basically a security watchguard. It's rare that
       * you actually want to disconnect the current connection, so instead you should log the current
       * connection out (transitioning it back to a no-user-id connection) before doing the remove.
      */

      const userId = this.userId;
      Meteor.call('logout');  // at this point, this.userId is null and the token has been removed
      return Meteor.users.remove(userId);
    },

  });

}
