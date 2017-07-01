import './userFiles.html';

// import { Groups } from '/imports/api/groups/collection.js';
// import { defaultReactiveTableSettings, formatDateFn, formatUserFn, formatObjectFn} from '/imports/lib/reactiveTableHelpers.js';

Template.adminUserFiles.helpers({
  images() {
    return UserFiles.find({}, {sort: {createdAt: -1}});
  },
  formatSize(size) {
    return Math.floor(size / 1024) + "КБ";
  },
  totalSize() {
    const size = _.reduce(UserFiles.find().fetch(), (sum, file) => {
      return sum + file.size;
    }, 0);
    return Math.floor(size / 1024) + "КБ";
  },
});
//
// Template.adminUserFiles.events({
//   'dblclick .reactive-table tbody tr': function (event) {
//     var doc = this;
//     Router.go('admin.editAny', {collectionName: 'userFiles', _id: doc._id, prevPageTitle: "Файлы пользователей"});
//   }
// });
