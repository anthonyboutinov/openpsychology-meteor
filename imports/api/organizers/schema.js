import { LocationSchema } from '../schemas/location.js';
import { Events } from '../events/collection.js';

const ManagedBy = new SimpleSchema({
  userId: {
    type: String,
  },
  nonRetireable: {
    type: Boolean,
    label: "Обладатель объекта Организация",
    optional: true
  }
});

export const OrganizersSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Название",
    max: 100,
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
  bannerImageId: {
    type: String,
    label: "Изображение-баннер",
    optional: true,
    autoform: {
      group: "Описание",
      type: 'fileUpload',
      collection: 'Images',
      uploadTemplate: 'uploadField',
      previewTemplate: 'uploadPreview',
      template: "bootstrap3",
    }
  },
  imageId: {
    type: String,
    label: "Логотип",
    optional: true,
    autoform: {
      group: "Описание",
      type: 'fileUpload',
      collection: 'Images',
      uploadTemplate: 'uploadField',
      previewTemplate: 'uploadPreview',
      template: "bootstrap3",
      'help-block': "Рекомендуется: 120x120 px (разшенение @3⨉). Масштабируется в разрешение 40x40 px",
    }
  },
  email: {
    type: 'email',
    label: "Email",
    min: 5,
    max: 128,
    optional: true,
    regEx: SimpleSchema.RegEx.Email,
    autoform: {
      group: "Контакты",
      // 'help-text': "Email скрыт от посетителей сайта. Посетители могут отправлять сообщения на эту почту только через форму обратной связи"
      placeholder: "petrov@example.com",
    }
  },
  phoneNum: {
    type: 'String',
    label: "Номер телефона",
    min: 6,
    max: 10,
    regEx: /^[0-9]+$/,
    optional: true,
    autoform: {
      group: "Контакты",
      placeholder: "9000000000",
      'data-prefix': "+7",
    }
  },
  location: {
    type: LocationSchema,
    label: "Адрес",
    autoform: {
      group: "Контакты",
    }
  },

  socialLinkVK: {
    type: 'String',
    label: "Ссылка ВКонтакте",
    optional: true,
    autoform: {
      group: "Ссылки на социальные сети",
      'data-prefix': "http://vk.com/",
    },
  },
  socialLinkOdnoklassniki: {
    type: 'String',
    label: "Ссылка Одноклассники",
    optional: true,
    autoform: {
      group: "Ссылки на социальные сети",
      'data-prefix': "http://ok.ru/",
    },
  },
  socialLinkFacebook: {
    type: 'String',
    label: "Ссылка Facebook",
    optional: true,
    autoform: {
      group: "Ссылки на социальные сети",
      'data-prefix': "http://facebook.com/",
    },
  },
  socialLinkYouTube: {
    type: 'String',
    label: "Ссылка YouTube",
    optional: true,
    autoform: {
      group: "Ссылки на социальные сети",
      'data-prefix': "http://youtube.com/",
    },
  },
  socialLinkTwitter: {
    type: 'String',
    label: "Ссылка Twitter",
    optional: true,
    autoform: {
      group: "Ссылки на социальные сети",
      'data-prefix': "http://twitter.com/",
    },
  },

  managedBy: {
    type: [ManagedBy],
    label: "Управляющие",
    // 'help-text': "Список людей, которые могут редактировать инфомрацию об организации; добавлять, изменять и удалять события",
  }
});
