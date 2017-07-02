import { Template } from 'meteor/templating';

import './body.js';
import './loading.html';
import './globalHelpers.js';
import './layouts';
import './pages';

if(Meteor.isServer){
  import './emailTemplates';
}
