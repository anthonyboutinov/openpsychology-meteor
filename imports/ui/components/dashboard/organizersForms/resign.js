import './resign.html';

import { Organizers } from '/imports/api/organizers/collection.js';
import * as select2Users from './select2Users.js';

Template.organizersFormResign.helpers({
  Organizers() {
    return Organizers;
  },
});

Template.organizersFormResign.onRendered(function(){
  select2Users.onRendered(this);
});
