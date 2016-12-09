import { Categories } from '../categories';

import { LocationSchema } from '../schemas/location.js';
import { EventDatesSchema } from '../schemas/eventDates.js';
import { LikeSchema } from '../schemas/like.js';
import { BookmarkSchema } from '../schemas/bookmark.js';
import { Coaches } from '/imports/api/coaches/collection.js';

const PriceSchema = new SimpleSchema({
  regular: {
    type: Number,
    label: "Обычная стоимость",
    optional: true,
    min: 0,
    defaultValue: 0,
    autoform: {
      placeholder: "Бесплатно"
    }
  },
  sale: {
    type: Number,
    label: "С учетом скидки",
    optional: true,
    min: 0,
    autoform: {
      placeholder: "Скидки нет"
    }
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
      },
      "data-minimumResultsForSearch": "Infinity",
      "data-placeholder": "Укажите категорию",
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
    autoform: {
      hidden: true,
    }
  },

  'coachesIds': {
    type: Array,
    label: "Тренера/ведущие",
    defaultValue: [],
    maxCount: 50,
    autoform: {
      group: "Описание",
    },
  },
  'coachesIds.$': {
    type: String,
    label: "Тренер",
    autoform: {
      type: 'select',
      options: function() {
        return Coaches.find({}, {orderBy: {'name': 1}}).map(function(doc) {
          console.log(doc._id, doc.name);
          return {
            value: doc._id,
            label: doc.name
          }
        });
      },
      'data-placeholder': "Выберите человека",
    },
    optional: true,
  },
  coachesCollectiveLabel: {
    type: String,
    defaultValue: "Тренера/ведущие",
    autoform: {
      type: 'select',
      options: _.sortBy(["Тренера/ведущие", "Тренер", "Ведущий", "Тренера", "Ведущие"], (v)=>{return v}/*лексикографически*/)
    }
  },

  dates: {
    type: [EventDatesSchema],
    label: "Даты проведения",
    autoform: {
      group: "Описание",
    }
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
  },

  bookmarks: {
    type: [BookmarkSchema],
    autoform: {
      type: "hidden",
    },
    defaultValue: [],
  }
});
