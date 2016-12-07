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

export const UserProfileSchema = new SimpleSchema({
  systemNotifications: {
    type: [String],
    defaultValue: [
      SystemNotifications.showWelcomeNotification
    ],
  },
  settings: {
    type: UserSettingsSchema,
    defaultValue: {},
  },
  name: {
    type: String,
    label: "Имя, Фамилия",
    optional: true,
  },
  gender: {
    type: String,
    label: "Пол",
    allowedValues: ['Мужчина', 'Женщина', 'Другой'],
    optional: true
  },
  city: {
    type: String,
    optional: true,
    label: "Город",
    allowedValues: [
      "Москва",
      "Новосибирск",
      "Екатеринбург",
      "Нижний Новгород",
      "Казань",
      "Челябинск",
      "Омск",
      "Самара",
    ],
  },
});
