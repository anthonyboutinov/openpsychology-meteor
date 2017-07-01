import { check } from 'meteor/check';
import { Organizers } from './collection.js';

Meteor.methods({

  // @secure
  'organizers.remove': function(_id) {
    check(_id, String);
    Security.can(this.userId).remove(_id).for(Organizers).throw();
    return Organizers.remove({_id: _id, ownerId: this.userId});
  }

});
