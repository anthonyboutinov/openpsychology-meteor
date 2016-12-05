import { check } from 'meteor/check';
import { Organizers } from './collection.js';
import { Events } from '/imports/api/events/collection.js';

if (Meteor.isServer) {

  Meteor.publish('organizer', function(_id) {
    check(_id, String);
    return Organizers.find({_id: _id});
  });

  Meteor.publish('organizers.managedByUser', function() {
    return Organizers.find({ 'managedBy.userId': this.userId }, {orderBy: 'createdAt', limit: 100});
  });

  Meteor.publish('organizer.byEventId', function(_id) {
    check(_id, String);
    let organizerId = Events.findOne({_id: _id}).organizer._id;
    return Organizers.find({_id: organizerId});
  });

}
