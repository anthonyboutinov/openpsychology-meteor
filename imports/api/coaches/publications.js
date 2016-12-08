import { check } from 'meteor/check';
import { Coaches } from './collection.js';

if (Meteor.isServer) {

  Meteor.publish('coach', function(_id) {
    check(_id, String);
    return Coaches.find(_id);
  });

  Meteor.publish('coaches.byOrganizer', function(organizerId) {
    check(organizerId, String);
    return Coaches.find({ 'organierId': organizerId }, {orderBy: 'name', limit: 300});
  });

  Meteor.publish('coaches.forEvent', function(eventId) {
    check(eventId, String);
    const coachesIds = _plunk(Events.findOne(eventId, {fields: {coachesIds: 1}}), 'coachesIds');
    return Coaches.find({_id: {$in: coachesIds}}, {orderBy: 'name'});
  });

}
