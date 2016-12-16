import './collaborators.html';
import './resign.js';

import { Organizers } from '/imports/api/organizers/collection.js';
import * as select2Users from './select2Users.js';

Template.organizersFormCollaborators.helpers({
  Organizers() {
    return Organizers;
  },
  ownerIdName() {
    const user = Meteor.users.findOne(this.organizer().ownerId, {fields: {'profile.name': 1, 'emails': 1}});
    return user.emails[0].address +
      (user.profile.name || Meteor.userId() == user._id ?
        " (" +
        (Meteor.userId() == user._id ? "Вы" : user.profile.name) +
        ")" :
        ""
      );
  },
  isOwner() {
    return this.organizer().ownerId == Meteor.userId();
  },
  specialFormTypeIsResign() {
    return this.specialFormType == "resign";
  },
});

Template.organizersFormCollaborators.onRendered(function() {
  select2Users.onRendered(this);
});
