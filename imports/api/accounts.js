Accounts.config({
    sendVerificationEmail: true
});



// Accounts.onCreateUser(function(options, user) {
//
//     // we wait for Meteor to create the user before sending an email
//     Meteor.setTimeout(function() {
//         Accounts.sendVerificationEmail(user._id);
//     }, 2 * 1000);
//
//     return user;
// });

Meteor.methods({
  "accounts.sendVerificationEmail":function(){
    if (this.userId) {
      Accounts.sendVerificationEmail(this.userId);
    }
  }
});
