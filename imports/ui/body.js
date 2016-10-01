import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';

import './body.html';
import './navbar.html';

Template.body.helpers({
  tasks() {
    return Tasks.find({});
  },
});
