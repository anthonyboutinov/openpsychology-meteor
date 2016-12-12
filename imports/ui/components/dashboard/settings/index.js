import './profile.name.html';
import './profile.city.html';
import './profile.demographics.html';
import './email.html';
import './changePassword.js';

import * as TemplateSetup from './templatesSetup.js';

Template.settingsProfileNameForm.events(TemplateSetup.ev);
Template.settingsProfileCityForm.events(TemplateSetup.ev);
Template.settingsProfileDemographicsForm.events(TemplateSetup.ev);
Template.settingsEmailForm.events(TemplateSetup.ev);

Template.settingsEmailForm.helpers({
  emailVerified() {
    return Meteor.user().emails[0].verified;
  },
});

// TODO: This solution is temporary, until this code moves into autoform-contemporary
Template.settingsProfileCityForm.onRendered(TemplateSetup.onRendered);
Template.settingsProfileDemographicsForm.onRendered(TemplateSetup.onRendered);
