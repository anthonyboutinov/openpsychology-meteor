// TODO: send email on message creation

import { Messages } from './collection.js';

// Update `lastMessageAt` field of the conversation
Messages.after.insert(function (userId, doc) {
  Conversations.update(doc.conversationId, {
    $set: {lastMessageAt: doc.createdAt}
  });
});
