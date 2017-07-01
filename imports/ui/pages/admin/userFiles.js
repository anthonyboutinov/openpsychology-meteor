import './userFiles.html';

import { SizeConverter } from '/imports/lib/sizeConverter.js';

Template.adminUserFiles.helpers({
  images() {
    return UserFiles.find({}, {sort: {createdAt: -1}});
  },
  formatSize: SizeConverter.prettyFileSize,
  totalSize() {
    const size = _.reduce(UserFiles.find().fetch(), (sum, file) => {
      return sum + file.size;
    }, 0);
    return SizeConverter.prettyFileSize(size);
  },
});
