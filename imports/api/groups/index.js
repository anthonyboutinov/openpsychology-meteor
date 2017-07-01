import './collection.js';

if (Meteor.isServer) {
  import './security.js';
  import './publications.js';
  import './methods.js';
}
