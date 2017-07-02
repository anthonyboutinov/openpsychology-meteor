import { check } from 'meteor/check';
import { Organizers } from './collection.js';
import { Events } from '/imports/api/events/collection.js';
import { Groups } from '/imports/api/groups/collection.js';
import * as EventsPublishFunctions from '/imports/api/events/publishCommonFunctions.js';

if (Meteor.isServer) {

  Meteor.publish('organizer', function(_id) {
    check(_id, String);
    return Organizers.find(_id);
  });

  Meteor.publish('organizers.all', function() {
    return Organizers.find({}, {reactive: false});
  });

  Meteor.publish('organizers.managedByUser', function() {
    if (!this.userId) return false;
    check(this.userId, String);
    return Organizers.find({
      $or: [
        {ownerId: this.userId},
        {managedBy: this.userId}
      ]
    }, {limit: 100});
  });

  Meteor.publish('organizer.byEventId', function(_id) {
    check(_id, String);
    const event = Events.findOne(_id);
    if (!event) return [];
    const organizerId = event.organizerId;
    return Organizers.find({_id: organizerId});
  });

  Meteor.publish('organizers.forEvents.inGroup', function(abbreviation) {
    check(abbreviation, String);
    const group = Groups.findOne({abbreviation: abbreviation}, {fields: {items: 1}});
    if (!group) throw new Meteor.Error("abbreviation-not-found", "Can't find group with abbreviation " + groupAbbreviation);
    if (!group.items) return false;
    const itemIds = _.pluck(group.items, '_id');
    const events = Events.find({_id: {$in: itemIds}, isPublished: true}, {
      limit: group.publishLimit,
      sort: {'dates.dateFrom': 1},
      fields: {organizerId: 1}
    }).fetch();
    const organizerIds = _.uniq(_.pluck(events, 'organizerId'));
    const organizers = Organizers.find({_id: {$in: organizerIds}});
    return organizers;
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
