import { Categories } from '../categories';

import { LocationSchema } from '../schemas/location.js';
import { EventDatesSchema } from '../schemas/eventDates.js';
import { LikeSchema } from '../schemas/like.js';

const PriceSchema = new SimpleSchema({
  regular: {
    type: Number,
    label: "Обычная стоимость",
    optional: true,
    min: 0,
  },
  sale: {
    type: Number,
    label: "С учетом скидки",
    optional: true,
    min: 0,
  },
});

const OrganizerShortenedSchema = new SimpleSchema({
  _id: {
    type: String,
    label: "ID организатора",
  },
  name: {
    type: String,
    label: "Название организации",
  },
  imageUrl: {
    type: String,
    optional: true,
    label: "URL изображения",
  }
});

export const EventsSchema = new SimpleSchema({

  createdAt: {
    type: Date,
    label: "Время создания",
    // value: function() {
    //   return new Date();
    // },
    autoform: {
      group: "Мета",
    },
  },
  categoryId: {
    type: String,
    label: "Категория",
    autoform: {
      group: "Основное",
      options: function () {
        return Categories.find().map(function(doc) {
          return {
            value: doc._id,
            label: doc.singularName
          }
        });
      }
    },
  },

  bannerUrl: {
    type: String,
    label: "Изображение-баннер",
    optional: true,
    autoform: {
      group: "Описание",
      type: 'file',
    }
  },
  imageUrl: {
    type: String,
    label: "Логотип",
    optional: true,
    autoform: {
      group: "Описание",
      type: 'file',
    }
  },

  title: {
    type: String,
    label: "Название",
    max: 128,
    min: 3,
    autoform: {
      group: "Основная информация",
    }
  },
  description: {
    type: 'markdown',
    label: "Описание",
    max: 4000,
    optional: true,
    autoform: {
      // rows: 6,
      type: "markdown",
      group: "Описание",
    }
  },

  location: {
    type: LocationSchema,
    label: "Адрес",
    optional: true,
    autoform: {
      group: "Контакты",
    }
  },

  price: {
    type: PriceSchema,
    label: "Стоимость",
    autoform: {
      group: "Стоимость",
    }
  },

  organizer: {
    label: "Организация",
    type: OrganizerShortenedSchema,
  },

  dates: {
    type: [EventDatesSchema],
    label: "Даты проведения",
  },

  registeredForEvent: {
    type: [String],
    label: "Зарегистрированные на событие пользователи",
    autoform: {
      type: "hidden",
    },
    defaultValue: [],
  },

  likes: {
    type: [LikeSchema],
    autoform: {
      type: "hidden",
    },
    defaultValue: [],
  }
});
