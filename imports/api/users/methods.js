  import { check } from 'meteor/check';

  Meteor.methods({

    // @noSecurityChecksRequired
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

    // @secure
    'user.profile.name.update'(value) {
      check(value, String);
      const modifier = {$set: {"profile.name": value}};
      Security.can(this.userId).update(this.userId, modifier).for(Meteor.users).throw();
      return Meteor.users.update({ _id: this.userId }, modifier);
    },

    // @secure
    'user.appSpecific.systemNotifications.remove'(title) {
      check(title, String);
      const modifier = {$pull: {"appSpecific.systemNotifications": title}};
      Security.can(this.userId).update(this.userId, modifier).for(Meteor.users).throw();
      return Meteor.users.update({ _id: Meteor.userId() }, modifier);
    },

    // @secure
    'user.remove'(_id = this.userId) {
      Security.can(this.userId).remove(_id).for(Meteor.users).throw();

      if (this.userId === _id) {
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

      } else {
        return Meteor.users.remove(_id);
      }
    },

  });
