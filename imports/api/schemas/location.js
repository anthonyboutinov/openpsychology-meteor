export const LocationSchema = new SimpleSchema({
  city: {
    type: String,
    label: "Город",
    allowedValues: _.sortBy([
      "Москва",
      "Новосибирск",
      "Екатеринбург",
      "Нижний Новгород",
      "Казань",
      "Челябинск",
      "Омск",
      "Самара",
    ], (v)=>{return v}),
    autoform: {
      group: null,
      options: "allowed",
      "data-placeholder": "Укажите город",
    },
  },
  line1: {
    type: String,
    label: "Улица, здание",
    max: 128,
    optional: true,
    autoform: {
      group: null,
      placeholder: "пр. Победы, д. 1к2"
    }
  },
  additionalInfo: {
    type: String,
    label: "Дополнительная информация",
    optional: true,
    max: 128,
    autoform: {
      group: null,
      placeholder: "2 этаж, оф. 201, вход со двора"
    }
  }
});
