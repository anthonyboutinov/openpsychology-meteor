import './promotions.html';

import { Groups } from '/imports/api/groups/collection.js';
import { defaultReactiveTableSettings, formatDateFn, formatUserFn } from '/imports/lib/reactiveTableHelpers.js';

Template.adminPromotions.helpers({
  settings() {
    return _.extend(defaultReactiveTableSettings, {
      collection: Groups,
      fields: [
        { key: 'name', label: 'Название' },
        { key: 'refKind', label: 'Тип объектов' },
        { key: 'maxItems', label: 'Макс. вместимость' },
        { key: 'updatedAt', label: 'Обновлено', fn: formatDateFn },
        { key: 'updatedBy', label: 'Обновлено кем', fn: formatUserFn },
      ]
    })
  },
});

Template.adminPromotions.events({
  'dblclick .reactive-table tbody tr': function (event) {
    var row = this;
    console.log(row);
  }
});
