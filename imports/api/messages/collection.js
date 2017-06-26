import { Mongo } from 'meteor/mongo';
import { MessageSchema } from './schema.js';
import { Conversations } from '/imports/api/conversations/collection.js';
import { Organizers } from '/imports/api/organizers/collection.js';
import { Events } from '/imports/api/events/collection.js';

Message = function (doc) {
  _.extend(this, doc);
};

Message.prototype = {
  constructor: Message,

  /*
   * Base
   */


};

export const Messages = new Mongo.Collection("messages", {
  transform: function(doc) {
    return new Message(doc);
  }
});

Messages.attachSchema(MessageSchema);
Messages.attachBehaviour('timestampable');
