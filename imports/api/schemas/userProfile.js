export const UserProfileSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Имя, Фамилия",
    optional: true,
  },
  // birthday: {
  //     type: Date,
  //     optional: true
  // },
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
  }
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
