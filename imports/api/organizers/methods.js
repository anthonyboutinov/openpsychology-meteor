import { check } from 'meteor/check';
import { Organizers } from './collection.js';

if (Meteor.isServer) {

  Meteor.methods({
    'organizers.remove': function(_id) {
      check(_id, String);
      check(this.userId, String);
      console.log("organizers.remove: " + _id);
      Organizers.remove({_id: _id, managedBy: { userId: this.userId, nonRetireable: true}});
    }
  });

}
