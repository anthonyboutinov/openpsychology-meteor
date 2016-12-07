export const UserSettingsSchema = new SimpleSchema({
  showWelcomeNotification: {
    type: Boolean,
    defaultValue: true,
    optional: true,
    autoform: {
      hidden: true
    }
  },
  showCalendarSubscriptionFunctionalityNotification: {
    type: Boolean,
    optional: true,
    autoform: {
      hidden: true
    }
  },
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

  // organization : {
  //     type: String,
  //     optional: true
  // },
  // website: {
  //     type: String,
  //     regEx: SimpleSchema.RegEx.Url,
  //     optional: true
  // },
  // bio: {
  //     type: String,
  //     optional: true
  // },
  // country: {
  //     type: Schema.UserCountry,
  //     optional: true
  // }
});
