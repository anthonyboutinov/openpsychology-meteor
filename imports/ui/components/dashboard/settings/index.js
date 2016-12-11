import './profile.name.html';
import './profile.city.html';
import './profile.demographics.html';
import './email.html';

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

let hooksObject = {
  before: {
    update: function(doc) {
      if (this.currentDoc.emails.length > 1) {
        throw "Autoform #updateUserForm_email onBeforeUpdate hook: Current email update autoForm solution does not support multiple emails in user document!";
      }
      return {
        $set: {
          emails: [{
            address: doc.$set.emails[0].address,
            verified: this.currentDoc.emails[0].verified
          }]
        }
      };
    },
  },
  onSuccess: function(formType, result) {
    if (!result) {
      swal("Внимание!", "Не удалось изменить email", "warning");
    }
  },
  onError: function(formType, error) {
    console.log(error);
    swal("Ошибка!", error.message, "error");
  },
};
AutoForm.addHooks(['updateUserForm_email'], hooksObject);
