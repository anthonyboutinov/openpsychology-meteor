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
  bannerUrl: {
    type: String,
    label: "Изображение-баннер",
    optional: true,
    autoform: {
      group: "Описание",
      type: 'file',
      // 'help-text': "Отображается на странице организатора",
    }
  },
  imageUrl: {
    type: String,
    label: "Логотип",
    optional: true,
    autoform: {
      group: "Описание",
      type: 'file',
      // 'help-text': "Рекомендуется: 96⨉96 px (разшенение 3⨉). Масштабируется в разрешение 32⨉32 px"
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
  socialLinkVK: {
    type: 'String',
    label: "Ссылка ВКонтакте",
    optional: true,
    autoform: {
      group: "Ссылки на социальные сети",
    },
  },
  socialLinkOdnoklassniki: {
    type: 'String',
    label: "Ссылка Одноклассники",
    optional: true,
    autoform: {
      group: "Ссылки на социальные сети",
    },
  },
  socialLinkFacebook: {
    type: 'String',
    label: "Ссылка Facebook",
    optional: true,
    autoform: {
      group: "Ссылки на социальные сети",
    },
  },
  socialLinkYouTube: {
    type: 'String',
    label: "Ссылка YouTube",
    optional: true,
    autoform: {
      group: "Ссылки на социальные сети",
    },
  },
  socialLinkTwitter: {
    type: 'String',
    label: "Ссылка Twitter",
    optional: true,
    autoform: {
      group: "Ссылки на социальные сети",
    },
  },
  managedBy: {
    type: [ManagedBy],
    label: "Управляющие",
    // 'help-text': "Список людей, которые могут редактировать инфомрацию об организации; добавлять, изменять и удалять события",
  }
});
