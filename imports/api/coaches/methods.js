if (Meteor.isServer) {

  import { check } from 'meteor/check';
  import { Coaches } from './collection.js';
  import { Organizers } from '/imports/api/organizers/collection.js';

  Meteor.methods({
    'coach.remove': function(_id) {
      check(_id, String);
      check(this.userId, String);
      const managedOrganizers = Organizers.find({'managedBy.userId': this.userId}, {fields: {_id: 1}}).map(function(doc){return doc._id});
      return Coaches.remove({_id: _id, organizerId: {$in: managedOrganizers}});
    }
  });

}
