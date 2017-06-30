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
  },

  abbreviation: {
    type: String
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

  acceptsOnlyWithMatchingAbbreviation: {
    type: Boolean,
    optional: true,
    label: "Может включать только объекты с совпадающей аббревиатурой"
  },

  // Number of items to display
  // Actual number may be up to 3 times bigger because some items may get hidden/unpublished
  // during their lifecycle which will result in them not showing up on client's side.
  // WARNING! When publishing, one must keep that in mind and use sorting and limiting.
  maxItems: {
    type: Number,
    optional: true,
    defaultValue: 3,
    label: "Максимальная вместимость группы",
  },

});
