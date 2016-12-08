import { check } from 'meteor/check';
import { Coaches } from './collection.js';

if (Meteor.isServer) {

  // Meteor.methods({
  //   'coach.remove': function(_id) {
  //     check(_id, String);
  //     check(this.userId, String);
  //     Coaches.remove({_id: _id, managedBy: { userId: this.userId, nonRetireable: true}});
  //   }
  // });

}
