import './groupExpirationInfo.html';
import { Groups } from '/imports/api/groups/collection.js';

function _daysGoneIn(group, eventId) {
  const item = _.find(group.items, (item)=>{ return item.item/*must be itemId */ === eventId });
  return moment(new Date()).diff(item.createdAt, 'minutes');
}

function _daysTotalIn(group, eventId) {
  const item = _.find(group.items, (item)=>{ return item.item/*must be itemId */ === eventId });
  return moment(item.expiresAt).diff(item.createdAt, 'minutes');
}

Template.groupExpirationInfo.helpers({
  groups() {
    return Groups.find({ 'items.item': this.event._id });
  },

  progressBarValueIn(group) {
    return _daysGoneIn(group, this.event._id);
  },

  prograssbarMaxValueIn(group) {
    return _daysTotalIn(group, this.event._id);
  },

  progressBarPercentageIn(group) {
    return Math.round(_daysGoneIn(group, this.event._id) / _daysTotalIn(group, this.event._id) * 100, -1);
  },

  progressBarTimeLeftIn(group) {
    const minutes = _daysTotalIn(group, this.event._id) - _daysGoneIn(group, this.event._id);
    return moment.duration(minutes, "minutes").humanize();
  }
});
