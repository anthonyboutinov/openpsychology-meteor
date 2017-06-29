import { SystemNotifications } from '../systemNotifications.js';

export const UserSettingsSchema = new SimpleSchema({
  showOrganizerWelcomeScreen: {
    type: Boolean,
    defaultValue: true,
    optional: true,
    autoform: {
      hidden: true
    }
  },
});

export const AppSpecificUserDataSchema = new SimpleSchema({

systemNotifications: {
  type: [String],
  defaultValue: [
    SystemNotifications.showWelcomeNotification,
    SystemNotifications.showConfirmEmailNotification,
    SystemNotifications.showCalendarSubscriptionFunctionalityNotification
  ],
},
settings: {
  type: UserSettingsSchema,
  defaultValue: {},
}

});
