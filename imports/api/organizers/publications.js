import { check } from 'meteor/check';
import { Organizers } from './collection.js';
import { Events } from '/imports/api/events/collection.js';
import * as EventsPublishFunctions from '/imports/api/events/publishCommonFunctions.js';

if (Meteor.isServer) {

  Meteor.publish('organizer', function(_id) {
    check(_id, String);
    return Organizers.find(_id);
  });

  Meteor.publish('organizers.managedByUser', function() {
    check(this.userId, String);
    return Organizers.find({ 'managedBy.userId': this.userId }, {/*sort: 'createdAt', */limit: 100});
  });

  Meteor.publish('organizer.byEventId', function(_id) {
    check(_id, String);
    const event = Events.findOne(_id);
    if (!event) return [];
    const organizerId = event.organizerId;
    return Organizers.find({_id: organizerId});
  });

  /*
  params: {
    categoriesUrlNamesList - array of strings,
    constainsText - string,
    datesRange: {
      from - formatted date string,
      to - formatted date string,
    },
    options - Collection.find options dictionary
  }
  */
  Meteor.publish('organizers.forEvents', function(params) {
    const findParams = EventsPublishFunctions.getFindParams(params);
    // Make return only organizerId fields
    _.extend(params.options, {
      fields: {
        organizerId: 1
      }
    });
    const events = Events.find(findParams, params.options);
    const organizerIds = events.map((event)=>{return event.organizerId});
    return Organizers.find({_id: {$in: organizerIds}});
  });

}
