import { Mongo } from 'meteor/mongo';
import { ConversationSchema } from './schema.js';
import { Organizers } from '/imports/api/organizers/collection.js';
import { Events } from '/imports/api/events/collection.js';
import { Messages } from '/imports/api/messages/collection.js';

Conversation = function (doc) {
  _.extend(this, doc);
};

Conversation.prototype = {
  constructor: Conversation,

  /*
   * Base
   */

  user() {
    return Meteor.users.findOne(this.userId);
  },

  organizer() {
    return Organizers.findOne(this.organizerId);
  },

  event() {
    if (!this.eventId) return false;
    return Events.findOne(this.eventId);
  },

  // direction: "O2P", "P2O"
  unreadMessagesCount(direction) {
    return Messages.find({conversationId: this.id, direction: direction, isRead: false}).count(); // TODO: order and limit to about 20
  },

};

export const Conversations = new Mongo.Collection("conversations", {
  transform: function(doc) {
    return new Conversation(doc);
  }
});

Conversations.attachSchema(ConversationSchema);
Conversations.attachBehaviour('timestampable');
