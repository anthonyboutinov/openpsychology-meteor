export const GroupsSchema = new SimpleSchema({

  _id: {
    type: String,
    autoform: {
      hidden: true,
    }
  },

  name: {
    type: String,
    label: "Название группы",
  },

  refKind: {
    type: String,
    allowedValues: ["events", "organizers"],
    autoform: {
      type: 'select',
      options: "allowed",
      'data-placeholder': "Тип объектов в группе",
      "data-minimumResultsForSearch": "Infinity",
    },
  },

  items: {
    type: [Object],
    label: "Элементы группы",
    defaultValue: [],
    autoform: {
      hidden: true,
    }
  },

  "items.$.createdAt": {
    type: Date
  },
  "items.$.byUserWithId": {
    type: String
  },
  "items.$.item": {
    type: String
  },

  maxItems: {
    type: Number,
    optional: true,
    defaultValue: 3,
    label: "Максимальная вместимость группы",
  },

});
