import { Categories } from '../categories';

import { LocationSchema } from '../schemas/location.js';
import { EventDatesSchema } from '../schemas/eventDates.js';
import { LikeSchema } from '../schemas/like.js';
import { BookmarkSchema } from '../schemas/bookmark.js';
import { socialLinksProperties } from '../schemas/socialLinksProperties.js';
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

export const EventsSchema = new SimpleSchema(_.extend({
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

  organizerId: {
    type: String
  },

  imageId: {
    type: String,
    label: "Изображение",
    optional: true,
    autoform: {
      group: "Описание",
      type: 'fileUpload',
      collection: 'UserFiles',
      uploadTemplate: 'uploadField',
      previewTemplate: 'uploadPreview',
      template: "bootstrap3",
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

  coachesIds: {
    type: [String],
    label: "Тренера/ведущие",
    defaultValue: [],
    maxCount: 50,
    optional: true,
    autoform: {
      group: "Тренера/ведущие",
      type: 'select-multiple',
      'data-placeholder': "Нет тренера/ведущего",
      options: function() {
        return Coaches.find({}, {sort: {'name': 1}}).map(function(doc) {
          return {
            value: doc._id,
            label: doc.name
          }
        });
      },
    },
  },

  coachesCollectiveLabel: {
    type: String,
    label: "Именование",
    allowedValues: _.sortBy(["Тренер", "Ведущий", "Тренера", "Ведущие"], (v)=>{return v}/*лексикографически*/),
    autoform: {
      group: "Тренера/ведущие",
      type: 'select',
      options: "allowed",
      'data-placeholder': "Введущие",
      "data-minimumResultsForSearch": "Infinity",
    },
    optional: true, //conditional optional via custom field:
    custom: function () {
      var shouldBeRequired = this.field('coachesIds').length > 0;

      if (shouldBeRequired) {
        // inserts
        if (!this.operator) {
          if (!this.isSet || this.value === null || this.value === "") return "required";
        }

        // updates
        else if (this.isSet) {
          if (this.operator === "$set" && this.value === null || this.value === "") return "required";
          if (this.operator === "$unset") return "required";
          if (this.operator === "$rename") return "required";
        }
      }
    },
  },

  dates: {
    type: [EventDatesSchema],
    label: "Даты проведения",
    autoform: {
      group: "Описание",
    }
  },

  isPublished: {
    type: Boolean,
    label: "Настройка видимости",
    optional: true,
    autoform: {
      group: "Основная информация",
      template: "bootstrap3",
      type: "boolean-radios-optimized",
      trueLabel: "<i class='fa fa-fw fa-eye' aria-hidden='true'></i> Опубликовано",
      falseLabel: "<i class='fa fa-fw fa-eye-slash' aria-hidden='true'></i> Скрыто",
      'data-defaultValue': true,
    },
  },

  bookingOpen: {
    type: Boolean,
    label: "Регистрация пользователей",
    autoform: {
      group: "Основная информация",
      template: "bootstrap3",
      type: "boolean-radios-optimized",
      trueLabel: "<i class='fa fa-fw fa-check-square-o' aria-hidden='true'></i> Открыта",
      falseLabel: "<i class='fa fa-fw fa-ban' aria-hidden='true'></i> Закрыта",
      'data-defaultValue': true,
    },
    defaultValue: true,
  },

  useCustomSocialLinks: {
    type: Boolean,
    defaultValue: false,
    label: "Персонализация данных социальных сетей для мероприятия",
    autoform: {
      group: "Ссылки на социальные сети",
      template: "bootstrap3",
      type: "boolean-radios-optimized",
      trueLabel: "<i class='fa fa-fw fa-ellipsis-h' aria-hidden='true'></i> Использовать индивидуальные ссылки на социальные сети",
      falseLabel: "<i class='fa fa-fw fa-clone' aria-hidden='true'></i> Использовать данные Организации",
      'data-defaultValue': false,
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
}, socialLinksProperties));
