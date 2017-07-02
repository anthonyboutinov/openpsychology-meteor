import './profile.name.html';
import './profile.city.html';
import './profile.demographics.html';
import './email.js';
import './changePassword.js';
import './logoutOtherClients.html';

import * as TemplateSetup from './templatesSetup.js';

Template.settingsProfileNameForm.events(TemplateSetup.ev);
Template.settingsProfileCityForm.events(TemplateSetup.ev);
Template.settingsProfileDemographicsForm.events(TemplateSetup.ev);

// TODO: This solution is temporary, until this code moves into autoform-contemporary
Template.settingsProfileCityForm.onRendered(TemplateSetup.onRendered);
Template.settingsProfileDemographicsForm.onRendered(TemplateSetup.onRendered);


Template.settingsLogoutOtherClients.events({
  'click [mo-action="logoutOtherClients"]'(event, template) {
    Meteor.logoutOtherClients(function(error) {
      if (error) {
        swal("Ошибка", error, "error");
      } else {
        swal("Выполнено", "Выполнен выход из других клиентов.", "success");
      }
    });
  }
});
