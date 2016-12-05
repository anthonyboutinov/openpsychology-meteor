import { Mongo } from 'meteor/mongo';
import { EventsSchema } from './schema.js';

export const Events = new Mongo.Collection("events");

Events.attachSchema(EventsSchema);
