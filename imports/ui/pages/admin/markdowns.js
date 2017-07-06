import './markdowns.html';

import { defaultReactiveTableSettings, formatDateFn, formatUserFn, formatObjectFn } from '/imports/lib/reactiveTableHelpers.js';
import { Markdowns } from '/imports/api/markdowns/index.js';

Template.adminMarkdowns.helpers({
  settings() {
    return _.extend({
      collection: Markdowns,
      fields: [
        { key: 'name', label: 'Наименование', fn: (value, object)=>{
          return new Spacebars.SafeString("<a href=\"/md/" + object.name + " \">" + value + "</a>");
        } },
        { key: 'title', label: 'Название' },
        { key: 'updatedAt', label: 'Обновлен', fn: formatDateFn },
        { key: 'updatedBy', label: 'Обновлен кем', fn: formatUserFn },
      ]
    }, defaultReactiveTableSettings)
  },
});

Template.adminMarkdowns.events({
  'dblclick .reactive-table tbody tr': function (event) {
    var doc = this;
    Router.go('admin.editAny', {collectionName: 'markdowns', _id: doc._id, prevPageTitle: "Документы"});
  }
});
