import { check } from 'meteor/check';
import { Events } from './collection.js';
import * as EventsPublishFunctions from './publishCommonFunctions.js';
import * as queryByDate from '/both/queryByDate.js';
import { Categories } from '/imports/api/categories';
import { Organizers } from '/imports/api/organizers/collection.js';
import { Groups } from '/imports/api/groups/collection.js';

if (Meteor.isServer) {

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
  Meteor.publish('events', function(params) {
    const findParams = EventsPublishFunctions.getFindParams(params);
    Counts.publish(this, 'events.count', Events.find(findParams), {noReady: true});
    console.log("Events with params: ", findParams, params.options);
    return Events.find(findParams, params.options);
  });


  /*
  params: {
    _idOrganizer - ID,
    options - Collection.find options dictionary
  }
  */
  Meteor.publish('events.byOrganizer', function(params) {
    check(params._idOrganizer, String);

    let findParams = {
      organizerId: params._idOrganizer
    };
    if (params.addFindParams) {
      _.extend(findParams, params.addFindParams);
    }

    Counts.publish(this, 'events.byOrganizer.count', Events.find(findParams), {noReady: true});
    const events = Events.find(findParams, params.options);
    return events;
  });


  /*
  params: {
    userId - ID,
    timeframe - "past" || "ongoing" || "upcoming",
    options - Collection.find options dictionary
  }
  */
  Meteor.publish('events.userRegistered', function(params) {
    check(params.userId, String);
    if (params.timeframe) {
      check(params.timeframe, String);
    }

    let findParams = {
      'registeredForEvent': params.userId
    };

    if (params.timeframe == "past") {
      findParams = queryByDate.setFindPast(findParams);
    } else if (params.timeframe == "ongoing") {
      findParams = queryByDate.setFindOngoing(findParams);
    } else if (params.timeframe == "upcoming") {
      findParams = queryByDate.setFindUpcoming(findParams);
    }

    // console.log(JSON.stringify(findParams));
    const events = Events.find(findParams, params.options);
    return events;
  });


  /*
  params: {
    userId - ID,
    timeframe - "past" || "ongoing" || "upcoming"
  }
  */
  Meteor.publish('events.userRegistered.counts', function(params) {
    check(params.userId, String);
    check(params.timeframe, String);

    let findParams = {
      'registeredForEvent': params.userId
    };

    if (params.timeframe == "past") {
      findParams = queryByDate.setFindPast(findParams);
    } else if (params.timeframe == "ongoing") {
      findParams = queryByDate.setFindOngoing(findParams);
    } else if (params.timeframe == "upcoming") {
      findParams = queryByDate.setFindUpcoming(findParams);
    }

    return new Counter('events.userRegistered.counts.' + params.timeframe, Events.find(findParams));
  });


  Meteor.publish('events.liked.count', function() {
    check(this.userId, String);

    let findParams = {
      'likes.userId': this.userId
    };

    return new Counter('events.liked.count', Events.find(findParams));
  });


  /*
  params: {
    options - Collection.find options dictionary
  }
  */
  Meteor.publish('events.liked', function(options) {
    check(this.userId, String);

    let findParams = {
      'likes.userId': this.userId
    };

    return Events.find(findParams, options);
  });


  /*
  params: {
    options - Collection.find options dictionary
  }
  */
  Meteor.publish('events.bookmarked', function(options) {
    check(this.userId, String);

    let findParams = {
      'bookmarks.userId': this.userId
    };

    return Events.find(findParams, options);
  });


  Meteor.publish('events.bookmarked.count', function() {
    check(this.userId, String);

    let findParams = {
      'bookmarks.userId': this.userId
    };

    return new Counter('events.bookmarked.count', Events.find(findParams));
  });


  Meteor.publish('events.bookmarked.lastOne', function() {
    check(this.userId, String);

    let findParams = {
      'bookmarks.userId': this.userId
    };

    return Events.find(findParams, {
      limit: 1,
      /*sort: 'createdAt'*/ // TODO: sort must be different
    });
  });



  Meteor.publish('event', function(_id) {
    console.log("Event by id ", _id);
    // Find event and fetch it to know needed properties
    const event = Events.findOne(_id, {fileds: {isPublished: 1, organizer: 1}});
    // console.log(event);
    if (event && event.isPublished) {
      // If event is published -- return it
      return Events.find(_id);
    } else if (event && this.userId) {
      // If event is not published but there is a user logged in
      // Find if this event is from an managed organizer
      const isManaged = Organizers.find({
        _id: this.organizerId,
        $or: [
          {ownerId: this.userId},
          {managedBy: this.userId}
        ]
      }, {fields: {_id:1}}).count()
      if (isManaged) {
        // If so, display this hidden event (to organizer who manages it)
        return Events.find(_id);
      }
    }
    return [];
  });


  Meteor.publish('events.inGroup', function(groupAbbreviation) {
    check(groupAbbreviation, String);

    // Find group by its abbreviation, return only `items` field, and from array of items return an array of ids
    const group = Groups.findOne({abbreviation: groupAbbreviation}, {fields: {items: 1}});
    if (!group) {
      throw new Meteor.Error("abbreviation-not-found", "Can't find group with abbreviation" + groupAbbreviation);
    }
    const groupItemIds = group.items.map((e)=>{
      return e.item
    });

    return Events.find({_id: {$in: groupItemIds}, isPublished: true}, {
      limit: group.maxItems,
      sort: {'dates.dateFrom': 1}
    });

  });

}
