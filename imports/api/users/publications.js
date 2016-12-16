if (Meteor.isServer) {

  import { check } from 'meteor/check';
  import { Organizers } from '/imports/api/organizers/collection.js';

  Meteor.publish('users.whoManageOrganizer', function(organizerId) {
    check(organizerId, String);
    const organizer = Organizers.findOne(organizerId, {fields: {managedBy: 1, ownerId: 1}});
    if (!organizer) return false;
    let userIds = organizer.managedBy
    userIds.push(organizer.ownerId);
    console.log("users.whoManageOrganizer: ", userIds);
    return Meteor.users.find({_id: {$in: userIds}});
  });

}
