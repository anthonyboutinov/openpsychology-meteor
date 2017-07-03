  import { check } from 'meteor/check';
  import { Coaches } from './collection.js';
  import { Organizers } from '/imports/api/organizers/collection.js';

  Meteor.methods({

    // @secure
    'coach.remove': function(_id) {
      check(_id, String);
      Security.can(this.userId).remove(_id).for(Coaches).throw();
      return Coaches.remove(_id);
    },

    // @secure
    'coaches.remove': function(coachesIds) {
      check(coachesIds, Array);
      Security.can(this.userId).remove(_id).for(Coaches).throw();
      return Coaches.remove({_id: {$in: coachesIds}});
    },

  });
