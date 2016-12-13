if (Meteor.isServer) {

  import { check } from 'meteor/check';
  import { Coaches } from './collection.js';
  import { Events } from '/imports/api/events/collection.js';

  Meteor.publish('coach', function(_id) {
    check(_id, String);
    return Coaches.find(_id);
  });

  Meteor.publish('coaches.byOrganizer', function(organizerId) {
    check(organizerId, String);
    return Coaches.find({organizerId: organizerId}, {sort: {'name': 1}});
  });

  Meteor.publish('coaches.forEvent', function(eventId) {
    check(eventId, String);
    const event = Events.findOne(eventId, {fields: {coachesIds: 1}});
    if (!event) return [];
    return Coaches.find({_id: {$in: event.coachesIds}}, {sort: {'name': 1}});
  });

}
