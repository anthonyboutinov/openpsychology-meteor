export const LocationSchema = new SimpleSchema({
  city: {
    type: String,
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
    defaultValue: "Казань"
  },
  line1: {
    type: String,
    label: "Улица, здание",
    max: 128,
    optional: true,
  },
  additionalInfo: {
    type: String,
    label: "Дополнительная информация",
    optional: true,
    max: 128,
  }
});
