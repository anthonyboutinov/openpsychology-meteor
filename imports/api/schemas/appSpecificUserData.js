import { SystemNotifications } from '../systemNotifications.js';

export const UserSettingsSchema = new SimpleSchema({
  showOrganizerWelcomeScreen: {
    type: Boolean,
    defaultValue: true,
    optional: true,
    autoform: {
      type: "hidden",
    }
  },
});

export const AppSpecificUserDataSchema = new SimpleSchema({

systemNotifications: {
  type: [String],
  label: "Системные уведомления",
  defaultValue: [
    SystemNotifications.showWelcomeNotification,
    SystemNotifications.showConfirmEmailNotification,
    SystemNotifications.showCalendarSubscriptionFunctionalityNotification
  ],
},
settings: {
  label: "Настройки",
  type: UserSettingsSchema,
  defaultValue: {},
}

});
