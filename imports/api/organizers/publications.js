import { check } from 'meteor/check';
import { Organizers } from './collection.js';
import { Events } from '/imports/api/events/collection.js';

if (Meteor.isServer) {

  Meteor.publish('organizer', function(_id) {
    check(_id, String);
    return Organizers.find(_id);
  });

  Meteor.publish('organizers.managedByUser', function() {
    check(this.userId, String);
    return Organizers.find({ 'managedBy.userId': this.userId }, {orderBy: 'createdAt', limit: 100});
  });

  Meteor.publish('organizer.byEventId', function(_id) {
    check(_id, String);
    const event = Events.findOne(_id);
    if (!event) return [];
    const organizerId = event.organizer._id;
    return Organizers.find({_id: organizerId});
  });

}
