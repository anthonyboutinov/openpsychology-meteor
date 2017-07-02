export const GroupsSchema = new SimpleSchema({

  _id: {
    type: String,
    autoform: {
      type: "hidden",
    }
  },

  name: {
    type: String,
    label: "Название группы",
    autoform: {
      group: "Информация для интерфейса администраторов"
    }
  },

  link: {
    type: String,
    label: "Ссылка",
    optional: true,
    autoform: {
      group: "Информация для интерфейса администраторов"
    }
  },

  // Number of items to display
  // Actual number may be up to 3 times bigger because some items may get hidden/unpublished
  // during their lifecycle which will result in them not showing up on client's side.
  // WARNING! When publishing, one must keep that in mind and use sorting and limiting.
  //
  // Used as publication's limit
  publishLimit: {
    type: Number,
    optional: true,
    defaultValue: 3,
    label: "Максимальная вместимость группы",
    autoform: {
      group: "Настраивыемые параметры"
    }
  },

  items: {
    type: [Object],
    label: "Элементы группы",
    defaultValue: [],
    autoform: {
      hidden: true,
      group: "Настраивыемые параметры"
    }
  },

  "items.$.createdAt": {
    type: Date,
    label: "Добавлено в группу когда"
  },
  "items.$.byUserWithId": {
    type: String,
    label: "Добавлено кем"
  },
  "items.$._id": {
    type: String,
    label: "Объект"
  },
  "items.$.expiresAt": {
    type: Date,
    label: "Истекает",
  },

  abbreviation: {
    type: String,
    autoform: {
      group: "Техническая инфомрация"
    }
  },

  refKind: {
    type: String,
    allowedValues: ["events", "organizers"],
    autoform: {
      type: 'select',
      options: "allowed",
      'data-placeholder': "Тип объектов в группе",
      "data-minimumResultsForSearch": "Infinity",
      group: "Техническая инфомрация"
    },
  },

  acceptsOnlyWithMatchingAbbreviation: {
    type: Boolean,
    optional: true,
    label: "Может включать только объекты с совпадающей аббревиатурой",
    autoform: {
      group: "Техническая инфомрация"
    }
  },


});
