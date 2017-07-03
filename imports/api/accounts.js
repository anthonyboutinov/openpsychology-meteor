Accounts.config({
    sendVerificationEmail: true
});



Accounts.onCreateUser(function(options, user) {

    // we wait for Meteor to create the user before sending an email
    Meteor.setTimeout(function() {
        Accounts.sendVerificationEmail(user._id);
        console.log("Verification email sent");
    }, 2 * 1000);

    return user;
});

Meteor.methods({
  "accounts.sendVerificationEmail":function(){
    console.log({_this: this});
    if (this.userId) {
      Accounts.sendVerificationEmail(this.userId);
    }
  }
});
