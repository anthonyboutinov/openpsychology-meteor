if (Meteor.isServer) {

  import { check } from 'meteor/check';
  import { Messages } from './collection.js';

  Meteor.publish('messages.forConversation', function(conversationId) {
    check(conversationId, String);
    return Messages.find({conversationId: conversationId});
  });

  Meteor.publish('message.lastOneForConversation', function(conversationId) {
    check(conversationId, String);
    return Messages.find({conversationId: conversationId}, {sort: {createdAt: -1}, limit: 1});
  });

  Meteor.publish('messages.lastOnesForEachConversation', function() {
    check(this.userId, String);

    const organizerIds = Organizers.find({
      $or: [
        {ownerId: this.userId},
        {managedBy: this.userId}
      ]
    }, {limit: 100, fields: {_id: 1}}).map((organizer) => {return organizer._id});
    console.log("organizerIds: ", organizerIds);
    const conversations = Conversations.find({
      $or: [
        {userId: this.userId},
        {organizerId: {in: {oragnizerIds: organizerIds}}}
      ]
    }, {fields: {_id: 1}}).fetch();

    return Messages.find({conversationId: {$in: conversationIds}}, {sort: {createdAt: -1}, limit: 1});
  });

}
