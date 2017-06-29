if (Meteor.isServer) {

  import { check } from 'meteor/check';
  import { Groups } from './collection.js';
  // import { Events } from '/imports/api/events/collection.js';

  Meteor.publish('groups', function() {
    return Groups.find();
  });

}
