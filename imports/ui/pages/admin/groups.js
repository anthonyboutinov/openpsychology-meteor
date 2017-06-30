import './groups.html';

import { Groups } from '/imports/api/groups/collection.js';
import { defaultReactiveTableSettings, formatDateFn, formatUserFn, formatObjectFn} from '/imports/lib/reactiveTableHelpers.js';

Template.adminGroups.helpers({
  settings() {
    return _.extend({
      collection: Groups,
      fields: [
        { key: 'name', label: 'Название' },
        { key: 'refKind', label: 'Тип объектов', fn: formatObjectFn },
        { key: 'maxItems', label: 'Макс. вместимость', fn: formatObjectFn },
        { key: 'updatedAt', label: 'Обновлено', fn: formatDateFn },
        { key: 'updatedBy', label: 'Обновлено кем', fn: formatUserFn },
      ]
    }, defaultReactiveTableSettings)
  },
});

Template.adminGroups.events({
  'dblclick .reactive-table tbody tr': function (event) {
    var row = this;
    console.log(row);
  }
});
