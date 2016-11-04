import './fixtures.js';
import { Categories }  from '../../api/categories.js';
import { Events }      from '../../api/events.js';
import { Organizers } from '../../api/organizers.js';

Meteor.startup(() => {

  if (Categories.find().count() == 0) {

    const categories = [
      {
        urlName: "t",
        pluralName: "Тренинги",
        singularName: "Тренинг",
        order: 1,
      },
      {
        urlName: "s",
        pluralName: "Семинары",
        singularName: "Семинар",
        order: 2,
      },
      {
        urlName: "e",
        pluralName: "Образование",
        singularName: "Образование",
        order: 3,
      },
      {
        urlName: "o",
        pluralName: "Мероприятия онлайн",
        singularName: "Онлайн мероприятие",
        order: 4,
      },
    ];

    categories.forEach((category) => {
      Categories.insert(category);
    });

  };

  if (Organizers.find().count() == 0) {
    const organizers = [
      {
        createdAt: new Date(),

        _idsEditors: [
          "43285203tghds3",
          "432r9wfhsddsar",
        ],

        bannerUrl: "http://placehold.it/795x200",
        imageUrl: "http://placehold.it/114x114",

        name: "Название Организации №1",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        phoneNum: "8000000000",
        location: {
          city: "Казань",
          street: "ул. Тукая",
          building: "д. 23a",
          additionalInfo: "вход с торца здания",
        },
      }
    ];

    organizers.forEach((organizer) => {
      Organizers.insert(organizer);
    });
  }

  if (Events.find().count() == 0) {

    const categories = Categories.find({}, {fields: {'_id': 1}}).fetch().map((v) => {return v._id});
    console.log("Categories: ", categories);

    const organizers = Organizers.find({}, {fields: {'_id': 1}}).fetch().map((v) => {return v._id});
    console.log("Organizers: ", organizers);

    const inventDate = function() {

      const getRandomInt = function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      };

      let date = new Date();
      date.setMonth(date.getMonth() + 1);
      date.setDate(date.getDate() + getRandomInt(-15, 16));
      return date;
    };

    const events = [
      {
        createdAt: inventDate(),
        categoryId: categories[0],
        imageUrl: "/assets/placeholder360x180.png",
        bannerUrl: "http://placehold.it/795x200",
        title: "Путь пары. Гармония взаимоотношений в&nbsp;семье",
        description: "Полное описание Арбуз Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: inventDate(),
        location: {
          city: "Казань",
          street: "ул. Тукая",
          building: "д. 23a",
          additionalInfo: "вход с торца здания",
        },
        cost: 0,
        organizer: {
          _id: organizers[0],
          name: "Generic, Inc.",
          imageUrl: "http://placehold.it/24x24",
        },
      },
      {
        createdAt: inventDate(),
        categoryId: categories[0],
        imageUrl: "/assets/placeholder360x180.png",
        bannerUrl: "http://placehold.it/780x260",
        title: "Второй в нулевой категории",
        description: "Полное описание Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: new Date(),
        location: {
          city: "Казань",
          street: "ул. Тукая",
          building: "д. 23a",
          additionalInfo: "вход с торца здания",
        },
        cost: 800,
        organizer: {
          _id: organizers[0],
          name: "Generic, Inc.",
          imageUrl: "http://placehold.it/24x24",
        },
      },
      {
        createdAt: inventDate(),
        categoryId: categories[0],
        imageUrl: "/assets/placeholder360x180.png",
        bannerUrl: "http://placehold.it/780x260",
        title: "Третий в&nbsp;нулевой категории с&nbsp;длинным описанием",
        description: "Полное описание Lorem ipsum dolor sit amet, *consectetur* adipisicing **elit**, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nLorem ipsum dolor sit amet, <http://example.com> consectetur adipisicing elit, sed do eiusmod tempor incididunt quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n\n---\n\n* Item 1\n* Item 2",
        date: new Date(),
        location: {
          city: "Казань",
          street: "ул. Тукая",
          building: "д. 23a",
          additionalInfo: "вход с торца здания",
        },
        cost: 1600,
        organizer: {
          _id: organizers[0],
          name: "Generic, Inc.",
          imageUrl: "http://placehold.it/24x24",
        },
      },
      {
        createdAt: inventDate(),
        categoryId: categories[1],
        imageUrl: "/assets/placeholder360x180.png",
        bannerUrl: "http://placehold.it/780x260",
        title: "Первый в первой категории",
        description: "Полное описание Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: new Date(),
        location: {
          city: "Казань",
          street: "ул. Тукая",
          building: "д. 23a",
          additionalInfo: "вход с торца здания",
        },
        cost: 1500,
        organizer: {
          _id: organizers[0],
          name: "Generic, Inc.",
          imageUrl: "http://placehold.it/24x24",
        },
      },
      {
        createdAt: inventDate(),
        categoryId: categories[1],
        imageUrl: "/assets/placeholder360x180.png",
        bannerUrl: "http://placehold.it/780x260",
        title: "Второй в первой категории",
        description: "Полное описание Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: new Date(),
        location: {
          city: "Казань",
          street: "ул. Тукая",
          building: "д. 23a",
          additionalInfo: "вход с торца здания",
        },
        cost: 800,
        organizer: {
          _id: organizers[0],
          name: "Generic, Inc.",
          imageUrl: "http://placehold.it/24x24",
        },
      },
      {
        createdAt: inventDate(),
        categoryId: categories[1],
        imageUrl: "/assets/placeholder360x180.png",
        bannerUrl: "http://placehold.it/780x260",
        title: "Третий в первой категории",
        description: "Полное описание Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: new Date(),
        location: {
          city: "Казань",
          street: "ул. Тукая",
          building: "д. 23a",
          additionalInfo: "вход с торца здания",
        },
        cost: 800,
        organizer: {
          _id: organizers[0],
          name: "Generic, Inc.",
          imageUrl: "http://placehold.it/24x24",
        },
      },
      {
        createdAt: inventDate(),
        categoryId: categories[1],
        imageUrl: "/assets/placeholder360x180.png",
        bannerUrl: "http://placehold.it/780x260",
        title: "Четвертый в первой категории",
        description: "Полное описание Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: new Date(),
        location: {
          city: "Казань",
          street: "ул. Тукая",
          building: "д. 23a",
          additionalInfo: "вход с торца здания",
        },
        cost: 800,
        organizer: {
          _id: organizers[0],
          name: "Generic, Inc.",
          imageUrl: "http://placehold.it/24x24",
        },
      },
      {
        createdAt: inventDate(),
        categoryId: categories[2],
        imageUrl: "/assets/placeholder360x180.png",
        bannerUrl: "http://placehold.it/780x260",
        title: "Первый во второй категории",
        description: "Полное описание Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: new Date(),
        location: {
          city: "Казань",
          street: "ул. Тукая",
          building: "д. 23a",
          additionalInfo: "вход с торца здания",
        },
        cost: 800,
        organizer: {
          _id: organizers[0],
          name: "Generic, Inc.",
          imageUrl: "http://placehold.it/24x24",
        },
      },
      {
        createdAt: inventDate(),
        categoryId: categories[2],
        imageUrl: "/assets/placeholder360x180.png",
        bannerUrl: "http://placehold.it/780x260",
        title: "Второй во второй категории",
        description: "Полное описание Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: new Date(),
        location: {
          city: "Казань",
          street: "ул. Баки Урманче",
          building: "д. 23a",
          additionalInfo: "вход с торца здания",
        },
        cost: 800,
        organizer: {
          _id: organizers[0],
          name: "Generic, Inc.",
          imageUrl: "http://placehold.it/24x24",
        },
      },
      {
        createdAt: inventDate(),
        categoryId: categories[3],
        imageUrl: "/assets/placeholder360x180.png",
        bannerUrl: "http://placehold.it/780x260",
        title: "Единственный в третьей категории",
        description: "Полное описание Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: new Date(),
        location: {
          city: "Казань",
          street: "ул. Баки Урманче",
          building: "д. 23a",
          additionalInfo: "вход с торца здания",
        },
        cost: 800,
        organizer: {
          _id: organizers[0],
          name: "Generic, Inc.",
          imageUrl: "http://placehold.it/24x24",
        },
      },
    ];

    for (let i = 0; i < 20; i++) {
      events.forEach((event) => {
        Events.insert(event);
      });
    }

  }

  console.log(Categories.find().count() + " categories in total.");
  console.log(Organizers.find().count() + " organizers in total.");
  console.log(Events.find().count() + " events in total.");

});
