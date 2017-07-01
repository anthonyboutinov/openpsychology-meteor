import './users.html';

import { defaultReactiveTableSettings, formatDateFn, formatUserFn, formatObjectFn } from '/imports/lib/reactiveTableHelpers.js';

Template.adminUsers.helpers({
  settings() {
    return _.extend({
      collection: Meteor.users,
      fields: [
        { key: 'createdAt', label: 'Создан', fn: formatDateFn },
        { key: 'updatedAt', label: 'Обновлен', fn: formatDateFn },
        { key: '_id', label: 'ID', fn: formatObjectFn, hidden: true, },
        // { key: 'emails', label: 'Email', fn: formatObjectFn },
        { key: 'emails.0.address', label: 'Email'},
        { key: 'emails.0.verified', label: 'Верифицирован', fn: formatObjectFn },
        { key: 'profile', label: 'Профиль', fn: formatObjectFn },
        { key: 'roles.__global_roles__', label: 'Роли', fn: formatObjectFn },
      ]
    }, defaultReactiveTableSettings)
  },
});

Template.adminUsers.events({
  'dblclick .reactive-table tbody tr': function (event) {
    var doc = this;
    Router.go('admin.editAny', {collectionName: 'users', _id: doc._id, prevPageTitle: "Пользователи"});
  }
});
