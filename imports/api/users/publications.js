if (Meteor.isServer) {

  import { check } from 'meteor/check';
  import { Organizers } from '/imports/api/organizers/collection.js';
  import { Events } from '/imports/api/events/collection.js';

  const userFieldsToSendToCliens = {_id: 1, profile: 1, emails: 1, appSpecific: 1};
  const userFieldsToSendToAdmins = _.extend(
    { createdAt: 1, updatedAt: 1},
    _.omit(userFieldsToSendToCliens, 'appSpecific')
  );

  Meteor.publish(null, function() {
    return Meteor.users.find({_id: this.userId}, {fields: userFieldsToSendToCliens});
  });

  Meteor.publish('users.whoManageOrganizer', function(organizerId) {
    check(organizerId, String);
    const organizer = Organizers.findOne(organizerId, {fields: {managedBy: 1, ownerId: 1}});
    if (!organizer) return false;
    const userIds = organizer.managedBy;
    userIds.push(organizer.ownerId);
    console.log("users.whoManageOrganizer: ", userIds);
    return Meteor.users.find({_id: {$in: userIds}}, {fields: userFieldsToSendToCliens});
  });

  Meteor.publish('users.registeredForEvent', function(eventId) {
    check(eventId, String);
    const event = Events.findOne(eventId);
    if (!event) return false;
    const userIds = event.registeredForEvent;
    console.log("users.registeredForEvent userIds:", userIds);
    const users = Meteor.users.find({_id: {$in: userIds}}, {fields: userFieldsToSendToCliens});
    console.log("users.registeredForEvent.count=",users.count());
    return users;
  });

  Meteor.publish('users.admins', function() {
    return Meteor.users.find({'roles.__global_roles__': 'admin'}, {fields: userFieldsToSendToAdmins});
  });

  Meteor.publish('users.all', function() {
    return Meteor.users.find({}, {fields: userFieldsToSendToAdmins});
  });

}
