import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';

import './body.html';
import './navbar.html';
import './footer.html';
import './page.html';
import './page.js';

Template.body.helpers({
  tasks() {
    return Tasks.find({});
  },
});
