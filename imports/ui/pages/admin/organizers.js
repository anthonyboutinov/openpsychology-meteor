import './organizers.html';

import { Organizers } from '/imports/api/organizers/collection.js';
import { defaultReactiveTableSettings, formatDateFn, formatUserFn, formatObjectFn} from '/imports/lib/reactiveTableHelpers.js';

Template.adminOrganizers.helpers({
  settings() {
    return _.extend({
      collection: Organizers,
      fields: [
        { key: 'name', label: 'Название' },
        { key: 'location', label: 'Местположение', fn: formatObjectFn },
        { key: 'ownerId', label: 'Владелец', fn: formatUserFn },
        { key: 'managedBy', label: 'Управляющие', fn: formatUserFn },
        { key: 'createdAt', label: 'Создано', fn: formatDateFn },
        { key: 'createdBy', label: 'Создано кем', fn: formatUserFn },
        { key: 'updatedAt', label: 'Обновлено', fn: formatDateFn },
        { key: 'updatedBy', label: 'Обновлено кем', fn: formatUserFn },
      ]
    }, defaultReactiveTableSettings)
  },
});

Template.adminOrganizers.events({
  'dblclick .reactive-table tbody tr': function (event) {
    var doc = this;
    Router.go('admin.editAny', {collectionName: 'organizers', _id: doc._id, prevPageTitle: "Организации"});
  }
});
