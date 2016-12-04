import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Categories } from './categories.js';
import * as queryByDate from '../../both/queryByDate.js';
import { LocationSchema } from './schemas/location.js';
import { EventDatesSchema } from './schemas/eventDates.js';

export const Events = new Mongo.Collection("events");

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

Events.attachSchema(new SimpleSchema({

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
}));

if (Meteor.isServer) {

  /*
  params: {
    categoriesUrlNamesList - array of strings,
    constainsText - string,
    datesRange: {
      from - formatted date string,
      to - formatted date string,
    },
    options - Collection.find options dictionary
  }
  */
  Meteor.publish('events', function(params) {
    const categoryIds = Categories.find({urlName: {$in: params.categoriesUrlNamesList}}).map( (v) => {return v._id} );
    let findParams = {categoryId: {$in: categoryIds}};

    findParams = queryByDate.setFindContainsText(findParams, params.constainsText);

    let datesRangeAsDates = {};
    if (params.datesRange && params.datesRange.from) {
      datesRangeAsDates.from = queryByDate.parseDateRussianFormat(params.datesRange.from);
    }
    if (params.datesRange && params.datesRange.to) {
      datesRangeAsDates.to = queryByDate.parseDateRussianFormat(params.datesRange.to);
    }

    findParams = queryByDate.setFindDatesRange(findParams, datesRangeAsDates);

    // console.log(params);
    // console.log(JSON.stringify(findParams));

    Counts.publish(this, 'events.count', Events.find(findParams), {noReady: true});
    return Events.find(findParams, params.options);
  });


  /*
  params: {
    _idOrganizer - ID,
    options - Collection.find options dictionary
  }
  */
  Meteor.publish('events.byOrganizer', function(params) {
    check(params._idOrganizer, String);

    const findParams = {
      'organizer._id': params._idOrganizer
    };
    console.log(findParams);
    Counts.publish(this, 'events.byOrganizer.count', Events.find(findParams), {noReady: true});
    const events = Events.find(findParams, params.options);
    return events;
  });


  /*
  params: {
    userId - ID,
    timeframe - "past" || "ongoing" || "upcoming",
    options - Collection.find options dictionary
  }
  */
  Meteor.publish('events.userRegistered', function(params) {
    check(params.userId, String);
    if (params.timeframe) {
      check(params.timeframe, String);
    }

    let findParams = {
      'registeredForEvent': params.userId
    };

    if (params.timeframe == "past") {
      findParams = queryByDate.setFindPast(findParams);
    } else if (params.timeframe == "ongoing") {
      findParams = queryByDate.setFindOngoing(findParams);
    } else if (params.timeframe == "upcoming") {
      findParams = queryByDate.setFindUpcoming(findParams);
    }

    // console.log(JSON.stringify(findParams));
    const events = Events.find(findParams, params.options);
    return events;
  });


  /*
  params: {
    userId - ID,
    timeframe - "past" || "ongoing" || "upcoming"
  }
  */
  Meteor.publish('events.userRegistered.counts', function(params) {
    check(params.userId, String);
    check(params.timeframe, String);

    let findParams = {
      'registeredForEvent': params.userId
    };

    if (params.timeframe == "past") {
      findParams = queryByDate.setFindPast(findParams);
    } else if (params.timeframe == "ongoing") {
      findParams = queryByDate.setFindOngoing(findParams);
    } else if (params.timeframe == "upcoming") {
      findParams = queryByDate.setFindUpcoming(findParams);
    }

    return new Counter('events.userRegistered.counts.' + params.timeframe, Events.find(findParams));
  });


  Meteor.publish('event', function(_id) {
    return Events.find({ _id: _id});
  });


  Meteor.methods({
    'event.registerForEvent'(eventId, setRegistered) {
      check(eventId, String);
      check(setRegistered, Boolean);

      if (setRegistered) {
        Events.update(eventId, { $push: { registeredForEvent: this.userId} });
      } else {
        Events.update(eventId, { $pull: { registeredForEvent: this.userId} });
      }
    },
  });

}
