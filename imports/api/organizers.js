import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Categories } from './categories.js';

export const Organizers = new Mongo.Collection("organizers");

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

const Location = new SimpleSchema({
  city: {
    type: String,
    allowedValues: [
      "Казань",
      "Москва",
      "Екатерин"
    ],
  }
});

Organizers.attachSchema(new SimpleSchema({
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
    max: 2000,
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
    max: 64,
    optional: true,
    autoform: {
      group: "Контакты",
      // 'help-text': "Email скрыт от посетителей сайта. Посетители могут отправлять сообщения на эту почту только через форму обратной связи"
    }
  },
  phone: {
    type: 'String',
    label: "Номер телефона",
    min: 6,
    max: 10,
    optional: true,
    autoform: {
      group: "Контакты",
    }
  },
  location: {
    type: String,
    label: "Адрес",
    optional: true,
    autoform: {
      group: "Контакты",
    }
  },
  managedBy: {
    type: [ManagedBy],
    label: "Управляющие",
    // 'help-text': "Список людей, которые могут редактировать инфомрацию об организации; добавлять, изменять и удалять события",
  }
}));


if (Meteor.isServer) {

  Meteor.publish('organizer', function(_id) {
    check(_id, String);
    return Organizers.find({ _id: _id});
  });


  Meteor.publish('organizers.managedByUser', function() {
    return Organizers.find({ 'managedBy.userId': this.userId }, {orderBy: 'createdAt', limit: 100});
  });

}
