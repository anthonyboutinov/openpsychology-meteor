import { check } from 'meteor/check';
import { Markdowns } from './index.js';

Meteor.publish('markdown', function(_id) {
  check(_id, String);
  return Markdowns.find(_id);
});
Meteor.publish('markdown.byName', function(name) {
  check(name, String);
  return Markdowns.find({name: name}, {limit: 1});
});

Meteor.publish('markdowns.all', function(options = {}) {
  check(options, Object);
  return Markdowns.find({}, options);
});
