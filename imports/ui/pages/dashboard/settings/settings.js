import './settings.html';

import '/imports/ui/components/dashboard/settings';

const ChangePasswordSchema = new SimpleSchema({
  password: {
    type: String,
    label: "Password",
    min: 6
  },
  newPassword: {
    type: String,
    min: 6,
    label: "Password Confirmation",
  },
  passwordConfirmation: {
    type: String,
    min: 6,
    label: "Password Confirmation",
    custom: function() {
      if (this.value !== this.field('newPassword').value) {
        return "passwordMissmatch";
      }
    }
  },
});

Template.dashboardSettings.helpers({
  ChangePasswordSchema: ChangePasswordSchema,
});

// Template.dashboardSettings.events({
//
// });
