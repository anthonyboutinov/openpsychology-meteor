if (Meteor.isServer) {

  import { check } from 'meteor/check';
  import { Conversations } from './collection.js';
  import { Organizers } from '/imports/api/organizers/collection.js';

  Meteor.publish('conversations', function() {
    check(this.userId, String);

    const organizerIds = Organizers.find({
      $or: [
        {ownerId: this.userId},
        {managedBy: this.userId}
      ]
    }, {limit: 100, fields: {_id: 1}}).map((organizer) => {return organizer._id});

    console.log("organizerIds: ", organizerIds);

    return Conversations.find({
      $or: [
        {userId: this.userId},
        {organizerId: {in: {oragnizerIds: organizerIds}}}
      ]
    });
  });

  Meteor.publish('conversations.forOrganizer', function(organizerId) {
    check(organizerId, String);
    return Conversations.find({organizerId: organizerId});
  });

}
