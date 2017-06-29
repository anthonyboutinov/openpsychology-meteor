/*
 * Set up roles
 */

const hasAdmin = Meteor.users.findOne( { 'emails.address': 'anton4488@gmail.com' } );

if ( !hasAdmin ) {

  const users = [
    {name:"Альбина Вальярова",email:"albinaavg3@gmail.com", password: "password", roles:['admin']},
    {name:"Anthony Boutinov",email:"anton4488@gmail.com", password: "password", roles:['super-admin', 'admin']}
  ];

  _.each(users, function (user) {
    const id = Accounts.createUser({
      email: user.email,
      password: user.password,
      profile: { name: user.name }
    });

    if (user.roles.length > 0) {
      // Need _id of existing user record so this call must come
      // after `Accounts.createUser` or `Accounts.onCreate`
      Roles.addUsersToRoles(id, user.roles, Roles.GLOBAL_GROUP);
    }

  });

}
