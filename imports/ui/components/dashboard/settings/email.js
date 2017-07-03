import './email.html';
import * as TemplateSetup from './templatesSetup.js';

Template.settingsEmailForm.events(TemplateSetup.ev);

Template.settingsEmailForm.helpers({
  emailVerified() {
    return Meteor.user().emails[0].verified;
  },
});

Template.settingsEmailForm.events({
  'click [mo-action="sendVerificationEmail"]'(event, template) {
    event.preventDefault();
    Meteor.call("accounts.sendVerificationEmail");
    swal("Выполнено", "На Ваш email адрес отправлено письмо с инструкцией.", "success");
  }
});
