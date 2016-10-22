import './fixtures.js';
import { Categories } from '../../api/categories.js';
import { Events } from '../../api/events.js';

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

  if (Events.find().count() == 0) {

    const categories = Categories.find({}, {fields: {'_id': 1}}).fetch().map((v) => {return v._id});
    console.log(categories);

    const events = [
      {
        createdAt: new Date(),
        categoryId: categories[0],
        imageUrl: "/assets/placeholder360x180.png",
        title: "Путь пары. Гармония взаимоотношений в&nbsp;семье",
        description: "Полное описание Арбуз Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: new Date(),
        location: {
          city: "Казань",
          street: "Тукая",
          building: "23a",
          additionalInfo: "вход с торца здания",
        },
        cost: 0,
        organizer: {
          _id: "4343284390432",
          name: "Generic, Inc.",
          imageUrl: "http://placehold.it/24x24",
        },
      },
      {
        createdAt: new Date(),
        categoryId: categories[0],
        imageUrl: "/assets/placeholder360x180.png",
        title: "Второй в нулевой категории",
        description: "Полное описание Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: new Date(),
        location: {
          city: "Казань",
          street: "Тукая",
          building: "23a",
          additionalInfo: "вход с торца здания",
        },
        cost: 800,
        organizer: {
          _id: "4343284390432",
          name: "Generic, Inc.",
          imageUrl: "http://placehold.it/24x24",
        },
      },
      {
        createdAt: new Date(),
        categoryId: categories[0],
        imageUrl: "/assets/placeholder360x180.png",
        title: "Третий в нулевой категории",
        description: "Полное описание Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: new Date(),
        location: {
          city: "Казань",
          street: "Тукая",
          building: "23a",
          additionalInfo: "вход с торца здания",
        },
        cost: 800,
        organizer: {
          _id: "4343284390432",
          name: "Generic, Inc.",
          imageUrl: "http://placehold.it/24x24",
        },
      },
      {
        createdAt: new Date(),
        categoryId: categories[1],
        imageUrl: "/assets/placeholder360x180.png",
        title: "Первый в первой категории",
        description: "Полное описание Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: new Date(),
        location: {
          city: "Казань",
          street: "Тукая",
          building: "23a",
          additionalInfo: "вход с торца здания",
        },
        cost: 1500,
        organizer: {
          _id: "4343284390432",
          name: "Generic, Inc.",
          imageUrl: "http://placehold.it/24x24",
        },
      },
      {
        createdAt: new Date(),
        categoryId: categories[1],
        imageUrl: "/assets/placeholder360x180.png",
        title: "Второй в первой категории",
        description: "Полное описание Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: new Date(),
        location: {
          city: "Казань",
          street: "Тукая",
          building: "23a",
          additionalInfo: "вход с торца здания",
        },
        cost: 800,
        organizer: {
          _id: "4343284390432",
          name: "Generic, Inc.",
          imageUrl: "http://placehold.it/24x24",
        },
      },
      {
        createdAt: new Date(),
        categoryId: categories[1],
        imageUrl: "/assets/placeholder360x180.png",
        title: "Третий в первой категории",
        description: "Полное описание Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: new Date(),
        location: {
          city: "Казань",
          street: "Тукая",
          building: "23a",
          additionalInfo: "вход с торца здания",
        },
        cost: 800,
        organizer: {
          _id: "4343284390432",
          name: "Generic, Inc.",
          imageUrl: "http://placehold.it/24x24",
        },
      },
      {
        createdAt: new Date(),
        categoryId: categories[1],
        imageUrl: "/assets/placeholder360x180.png",
        title: "Четвертый в первой категории",
        description: "Полное описание Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: new Date(),
        location: {
          city: "Казань",
          street: "Тукая",
          building: "23a",
          additionalInfo: "вход с торца здания",
        },
        cost: 800,
        organizer: {
          _id: "4343284390432",
          name: "Generic, Inc.",
          imageUrl: "http://placehold.it/24x24",
        },
      },
      {
        createdAt: new Date(),
        categoryId: categories[2],
        imageUrl: "/assets/placeholder360x180.png",
        title: "Первый во второй категории",
        description: "Полное описание Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: new Date(),
        location: {
          city: "Казань",
          street: "Тукая",
          building: "23a",
          additionalInfo: "вход с торца здания",
        },
        cost: 800,
        organizer: {
          _id: "4343284390432",
          name: "Generic, Inc.",
          imageUrl: "http://placehold.it/24x24",
        },
      },
      {
        createdAt: new Date(),
        categoryId: categories[2],
        imageUrl: "/assets/placeholder360x180.png",
        title: "Второй во второй категории",
        description: "Полное описание Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: new Date(),
        location: {
          city: "Казань",
          street: "Тукая",
          building: "23a",
          additionalInfo: "вход с торца здания",
        },
        cost: 800,
        organizer: {
          _id: "4343284390432",
          name: "Generic, Inc.",
          imageUrl: "http://placehold.it/24x24",
        },
      },
      {
        createdAt: new Date(),
        categoryId: categories[3],
        imageUrl: "/assets/placeholder360x180.png",
        title: "Единственный в третьей категории",
        description: "Полное описание Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: new Date(),
        location: {
          city: "Казань",
          street: "Тукая",
          building: "23a",
          additionalInfo: "вход с торца здания",
        },
        cost: 800,
        organizer: {
          _id: "4343284390432",
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
  console.log(Events.find().count() + " events in total.");

});
