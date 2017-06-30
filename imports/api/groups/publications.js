if (Meteor.isServer) {

  import { check } from 'meteor/check';
  import { Groups } from './collection.js';

  Meteor.publish('groups', function() {
    return Groups.find();
  });

  Meteor.publish('group', function(_id) {
    check(_id, String);
    return Groups.find(_id);
  });

  Meteor.publish('groups.byAbbreviations', function(abbrs) {
    check(abbrs, [String]);
    return Groups.find({abbreviation: {$in: abbrs}});
  });

}
