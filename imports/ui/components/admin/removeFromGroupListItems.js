import './removeFromGroupListItems.html';
import { Groups } from '/imports/api/groups/collection.js';

Template.removeFromGroupListItems.helpers({
  groups() {
    return Groups.find();
  },
  isInGroup(groupItems) {
    const ids = groupItems.map((e)=>{ return e.item });
    return _.contains(ids, this.eventId);
  }
});

Template.removeFromGroupListItems_li.events({
  'click a' (event, template) {
    event.preventDefault();
    Meteor.call("event.removeFromGroup", this.eventId, this.group._id);
  },
});
