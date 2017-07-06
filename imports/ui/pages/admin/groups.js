import './groups.html';

import { Groups } from '/imports/api/groups/collection.js';
import { defaultReactiveTableSettings, formatDateFn, formatUserFn, formatObjectFn} from '/imports/lib/reactiveTableHelpers.js';

Template.adminGroups.helpers({
  settings() {
    return _.extend({
      collection: Groups,
      fields: [
        { fieldId: 'name', key: 'name', label: 'Название', fn: (value, object)=>{
          if (_.has(object, 'link')) {
            return new Spacebars.SafeString("<a href=\"" + object.link + " \">" + value + "</a>");
          } else {
            return value;
          }
        } },
        { fieldId: 'refKind', key: 'refKind', label: 'Тип объектов', fn: formatObjectFn },
        { fieldId: 'publishLimit', key: 'publishLimit', label: 'Отображать не более, шт.', cellClass: 'text-right' },
        { fieldId: 'count', key: 'items', label: 'Всего, шт.', cellClass: 'text-right', fn: (value)=>{
          return value.length;
        } },
        { fieldId: 'updatedAt', key: 'updatedAt', label: 'Обновлено', fn: formatDateFn },
        { fieldId: 'updatedBy', key: 'updatedBy', label: 'Обновлено кем', fn: formatUserFn },
      ]
    }, defaultReactiveTableSettings)
  },
});

Template.adminGroups.events({
  'dblclick .reactive-table tbody tr': function (event) {
    var doc = this;
    Router.go('admin.editAny', {collectionName: 'groups', _id: doc._id, prevPageTitle: "Группы"});
  }
});
