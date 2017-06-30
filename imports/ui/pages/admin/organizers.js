import './organizers.html';

import { Organizers } from '/imports/api/organizers/collection.js';
import { defaultReactiveTableSettings, formatDateFn, formatUserFn, formatObjectFn} from '/imports/lib/reactiveTableHelpers.js';

Template.adminOrganizers.helpers({
  settings() {
    return _.extend({
      collection: Organizers,
      // fields: [
      //   { key: 'name', label: 'Название' },
      //   { key: 'refKind', label: 'Тип объектов', fn: formatObjectFn },
      //   { key: 'maxItems', label: 'Макс. вместимость', fn: formatObjectFn },
      //   { key: 'updatedAt', label: 'Обновлено', fn: formatDateFn },
      //   { key: 'updatedBy', label: 'Обновлено кем', fn: formatUserFn },
      // ]
    }, defaultReactiveTableSettings)
  },
});

Template.adminOrganizers.events({
  'dblclick .reactive-table tbody tr': function (event) {
    var doc = this;
    Router.go('admin.editAny', {collectionName: 'organizers', _id: doc._id, prevPageTitle: "Организаторы"});
  }
});
