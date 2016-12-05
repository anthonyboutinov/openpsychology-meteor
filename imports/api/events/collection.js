import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { BaseModel } from 'meteor/socialize:base-model';
import { EventsSchema } from './schema.js';

// export const Events = new Mongo.Collection("events");
export const Events__ = BaseModel.extendAndSetupCollection("events"); // new Mongo.Collection("events");
export const Events = Meteor.events;

// class EventModel extends BaseModel {
//   constructor(document) {
//     super(document);  //Must call super passing in the document.
//   }
//
//   author() {
//     return Meteor.users.findOne(this.managedBy[0].userId);
//   }
// };

//Attach the schema to the collection
// Events.attachSchema(EventsSchema);
Events__.appendSchema(EventsSchema);

//Attach the collection to the model so we can save/update/delete
// EventModel.attachCollection(Events);


Events.allow({
// Meteor.events.allow({
  insert: function(userId, event){
    /*
    event is an instance of the Event class thanks to collection
    transforms. This enables us to call it's methods to check
    if the user owns it and the author record exists
    */
    return event.checkOwnership();
  },
  update: function(userId, event){
    /*
    event is an instance of the Event class thanks to collection
    transforms. This enables us to call it's methods to check
    if the user owns it and the author record exists
    */
    return book.checkOwnership();
  },
  remove: function(userId, event) {
    /*
    event is an instance of the Event class thanks to collection
    transforms. This enables us to call it's methods to check
    if the user owns it and the author record exists
    */
    return event.checkOwnership()
  }
});


LikeableModel.makeLikeable(Events__, "event");
