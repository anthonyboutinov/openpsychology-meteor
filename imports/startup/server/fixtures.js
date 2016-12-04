const hasAdmin = Meteor.users.findOne( { 'emails.address': 'anton4488@gmail.com' } );

if ( !hasAdmin ) {
  Accounts.createUser({
    email: 'anton4488@gmail.com',
    password: 'password'
  });
}
