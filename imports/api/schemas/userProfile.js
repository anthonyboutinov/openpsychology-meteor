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
    autoform: {
      placeholder: "Петр Петров"
    }
  },
  gender: {
    type: String,
    label: "Пол",
    allowedValues: ['Мужчина', 'Женщина', 'Другой'],
    optional: true,
    autoform: {
      options: "allowed",
      "data-minimumResultsForSearch": "Infinity",
      "data-placeholder": "Предпочитаю не указывать",
    }
  },
  birthyear: {
    type: Number,
    label: "Год рождения",
    optional: true,
    allowedValues: function() {
      const legalAge = 13;
      const range = _.range(1920, new Date().getFullYear() - legalAge).map((v)=>{return v.toString()});
      return range;
    },
    autoform: {
      options: function() {
        const legalAge = 13;
        const range = _.range(1920, new Date().getFullYear() - legalAge).map((v)=>{
          return {
            label: v.toString(),
            value: v
          }
        });
        return range;
      },
      "data-placeholder": "Предпочитаю не указывать",
    }
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
    autoform: {
      options: "allowed",
      "data-placeholder": "Укажите свой город",
    }
  },
});
