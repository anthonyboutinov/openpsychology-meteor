import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Categories } from './categories.js';
import { Organizers } from './organizers.js';
import { Likes } from './likes.js';

export const Events = new Mongo.Collection("events");

/*
Parses string of format "dd.mm.yyyy" into date
*/
const parseDateRussianFormat = function(st) {
  const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
  return new Date(st.replace(pattern,'$3-$2-$1'));
}

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
  Meteor.publishComposite('events', function(params) {
    return {

      find: function() {
        // TODO: check method input params
        const categoryIds = Categories.find({urlName: {$in: params.categoriesUrlNamesList}}).map( (v) => {return v._id} );
        let findParams = {categoryId: {$in: categoryIds}};

        if (params.constainsText) {
          console.log("Searching Events w/text: " + params.constainsText);
          findParams.$or = [
            {title:       {$regex : ".*" + params.constainsText + ".*", $options: "i"}},
            {description: {$regex : ".*" + params.constainsText + ".*", $options: "i"}},
          ];
        }

        if (params.datesRange && params.datesRange.from) {
          const orArrayInstance = {
            'dateTo': {
              '$lt': parseDateRussianFormat(params.datesRange.from)
            }
          };

          const path = ['dates','$not', '$elemMatch', '$or'];
          if (findParams[path[0]]                   == null) {findParams[path[0]] = {}}
          if (findParams[path[0]][path[1]]          == null) {findParams[path[0]][path[1]] = {}}
          if (findParams[path[0]][path[1]][path[2]] == null) {findParams[path[0]][path[1]][path[2]] = {}}
          if (findParams[path[0]][path[1]][path[2]][path[3]] == null) {findParams[path[0]][path[1]][path[2]][path[3]] = []}
          findParams[path[0]][path[1]][path[2]][path[3]].push(orArrayInstance);
        }
        if (params.datesRange && params.datesRange.to) {
          // add 1 day to make this restriction inclusive
          let dateTo = parseDateRussianFormat(params.datesRange.to);
          dateTo = moment(dateTo).add(1, 'days').toDate();

          const orArrayInstance = {
            'dateTo': {
              '$gt': dateTo
            }
          };

          const path = ['dates','$not', '$elemMatch', '$or'];
          if (findParams[path[0]]                   == null) {findParams[path[0]] = {}}
          if (findParams[path[0]][path[1]]          == null) {findParams[path[0]][path[1]] = {}}
          if (findParams[path[0]][path[1]][path[2]] == null) {findParams[path[0]][path[1]][path[2]] = {}}
          if (findParams[path[0]][path[1]][path[2]][path[3]] == null) {findParams[path[0]][path[1]][path[2]][path[3]] = []}
          findParams[path[0]][path[1]][path[2]][path[3]].push(orArrayInstance);
        }

        // console.log(params);
        // console.log(JSON.stringify(findParams));

        Counts.publish(this, 'events.count', Events.find(findParams), {noReady: true});
        return Events.find(findParams, params.options);

      }, // eof find

      // children: [
      //   {
      //     collectionName: 'likes.forEvents',
      //     find: function(event) {
      //       // console.log("Likes aggregate... " + event._id);
      //       console.log(Likes.find({eventId: event._id}).count());
      //
      //       const aggr =  Likes.aggregate([
      //         { $match: { eventId: event._id } },
      //         { $group: { _id: '$eventId', likesCount: { $sum: '$likes' } } }
      //       ]);
      //       console.log("aggr ", aggr);
      //       if (aggr.length == 0) {
      //         return;
      //       }
      //       return aggr;
      //     }
      //   },
        // {
        //   find: function(event) {
        //     console.log("Organizers children... " + event.organizer._id);
        //     return Organizers.find({_id: event.organizer._id});
        //   }
        // }
      ], // eof children

    }
  });


  /*
  params: {
    _idOrganizer - ID,
    options - Collection.find options dictionary
  }
  */
  Meteor.publish('events.byOrganizer', function(params) {
    // TODO: check method input params
    const findParams = {
      'organizer._id': params._idOrganizer
    };
    console.log(findParams);
    Counts.publish(this, 'events.byOrganizer.count', Events.find(findParams), {noReady: true});
    const events = Events.find(findParams, params.options);
    return events;
  });



  Meteor.publish('event', function(eventId) {
    check(eventId, String);
    return Events.find({ _id: eventId});
  });




  Meteor.methods({
    'event.registerForEvent'(eventId, setRegistered) {
      check(eventId, String);
      check(setRegistered, Boolean);

      if (setRegistered) {
        Events.update(eventId, { $push: { registeredForEvent: this.userId} });
      } else {
        Events.update(eventId, { $pull: { registeredForEvent: this.userId} });
      }
    },
  });

}
