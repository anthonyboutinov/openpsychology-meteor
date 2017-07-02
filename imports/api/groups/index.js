import './collection.js';
import './hooks.js';

if (Meteor.isServer) {
  import './security.js';
  import './publications.js';
  import './methods.js';
}
