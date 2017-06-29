import './addToGroupListItems.html';
import { Groups } from '/imports/api/groups/collection.js';

Template.addToGroupListItems.helpers({
  groups() {
    return Groups.find();
  },
  isInGroup(groupItems) {
    const ids = groupItems.map((e)=>{ return e.item });
    return _.contains(ids, this.eventId);
  }
});

Template.addToGroupListItems_li.events({
  'click a' (event, template) {
    event.preventDefault();
    Meteor.call("event.addToGroup", this.eventId, this.group._id);
  },
});
