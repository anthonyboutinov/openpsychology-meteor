

Meteor.methods({
  'user.confirmPassword': function(digest) {
    if (this.userId) {
      var user = Meteor.user();
      var password = {digest: digest, algorithm: 'sha-256'};
      var result = Accounts._checkPassword(user, password);
      console.log(result);
      return result.error == null;
    } else {
      return false;
    }
  }
});
