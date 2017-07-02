import './addToGroupListItems.html';
import { Groups } from '/imports/api/groups/collection.js';

Template.addToGroupListItems.helpers({
  groups() {
    return Groups.find({$or: [
      { acceptsOnlyWithMatchingAbbreviation: { $exists: false } },
      { abbreviation: this.eventCategoryCode }
    ]});
  },
  isInGroup(groupItems) {
    const ids = groupItems.map((e)=>{ return e._id });
    return _.contains(ids, this.eventId);
  }
});

Template.addToGroupListItems_li.events({
  'click a' (event, template) {
    event.preventDefault();
    const days = window.prompt("На сколько дней добавить в группу?", "7");
    if (!days) {
      alert("Отменено по вашему решению");
      return;
    }
    const expiresAt = moment().add(days, 'days').toDate();
    Meteor.call("event.addToGroup", this.eventId, this.group._id, expiresAt);
  },
});
