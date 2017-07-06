import { Mongo } from 'meteor/mongo';
import { MarkdownsSchema } from './schema.js';

export const Markdowns = new Mongo.Collection("markdowns");

Markdowns.attachSchema(MarkdownsSchema);
Markdowns.attachBehaviour('timestampable');

if (Meteor.isServer) {
  import './security.js';
  import './publications.js';
}
