import './fixtures.js';
import './routes';
// import './placeholderdata.js';

Accounts.onCreateUser(function(options, user) {
  if (user.profile == undefined) user.profile = {};
  return user;
});
