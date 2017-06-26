import './collection.js';
import './hooks.js'; // TODO: check if should be on server only for email
if (Meteor.isServer) import './publications.js';
if (Meteor.isServer) import './methods.js';
