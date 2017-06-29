import { Mongo } from 'meteor/mongo';
import { GroupsSchema } from './schema.js';
// import { Organizers } from '/imports/api/organizers/collection.js';
// import { Events } from '/imports/api/events/collection.js';


Group = function (doc) {
  _.extend(this, doc);
};

Group.prototype = {
  constructor: Group,

};

export const Groups = new Mongo.Collection("groups", {
  transform: function(doc) {
    return new Group(doc);
  }
});

Groups.attachSchema(GroupsSchema);
Groups.attachBehaviour('timestampable');
