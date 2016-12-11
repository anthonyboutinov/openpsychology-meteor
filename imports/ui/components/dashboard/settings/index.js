import './profile.name.html';
import './profile.city.html';
import './profile.demographics.html';

import * as TemplateSetup from './templatesSetup.js';

Template.settingsProfileNameForm.events(TemplateSetup.ev);
Template.settingsProfileCityForm.events(TemplateSetup.ev);
Template.settingsProfileDemographicsForm.events(TemplateSetup.ev);

Template.settingsProfileNameForm.helpers(TemplateSetup.hlprs);
Template.settingsProfileCityForm.helpers(TemplateSetup.hlprs);
Template.settingsProfileDemographicsForm.helpers(TemplateSetup.hlprs);

Template.settingsProfileNameForm.onRendered(TemplateSetup.onRendered);
Template.settingsProfileCityForm.onRendered(TemplateSetup.onRendered);
Template.settingsProfileDemographicsForm.onRendered(TemplateSetup.onRendered);
