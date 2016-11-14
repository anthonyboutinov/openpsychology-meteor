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
      type: 'image',
    }
  },
  imageUrl: {
    type: String,
    label: "Логотип",
    optional: true,
    autoform: {
      group: "Описание",
      type: 'image',
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
    label: "Управляющие"
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
