import './users.html';

import { defaultReactiveTableSettings, formatDateFn, formatUserFn, formatObjectFn } from '/imports/lib/reactiveTableHelpers.js';

Template.adminUsers.helpers({
  settings() {
    return _.extend({
      collection: Meteor.users,
      fields: [
        { key: '_id', label: 'ID', fn: formatObjectFn },
        { key: 'emails', label: 'Email', fn: formatObjectFn },
        { key: 'profile', label: 'Профиль', fn: formatObjectFn },
        { key: 'appSpecific', label: 'App', fn: formatObjectFn },
        { key: 'roles', label: 'Роли', fn: formatObjectFn },
      ]
    }, defaultReactiveTableSettings)
  },
});

Template.adminUsers.events({
  'dblclick .reactive-table tbody tr': function (event) {
    var row = this;
    console.log(row);
  }
});
