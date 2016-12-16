// Meteor.startup(() => {
//
//   import { Categories }  from '/imports/api/categories/index.js';
//   import { Events }      from '/imports/api/events/collection.js';
//   import { Organizers }  from '/imports/api/organizers/collection.js';
//
//   /*
//    * Set up Organizers placeholders
//    */
//
//   if (Organizers.find().count() == 0) {
//     const organizers = [
//       {
//         createdAt: new Date(),
//
//         managedBy: [
//           {
//             userId: "3343r2ewds",
//             nonRetireable: true, // cannot be retired from managing community
//             addedAt: new Date(),
//             // TODO: accepted invitation etc...
//           }
//         ],
//
//         bannerImageId: "http://placehold.it/795x200",
//         imageId: "http://placehold.it/114x114",
//
//         name: "Название Организации №1",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//         phoneNum: "8000000000",
//         location: {
//           city: "Казань",
//           street: "ул. Тукая",
//           building: "д. 23a",
//           additionalInfo: "вход с торца здания",
//         },
//       }
//     ];
//
//     organizers.forEach((organizer) => {
//       Organizers.insert(organizer);
//     });
//   }
//
//
//   /*
//    * Set up Events placeholders
//    */
//
//   if (Events.find().count() == 0) {
//
//     const categories = Categories.find({}, {fields: {'_id': 1}}).fetch();//.map((v) => {return v._id});
//     console.log("Categories: ", categories);
//
//     const organizers = Organizers.find({}, {fields: {'_id': 1}}).fetch();//.map((v) => {return v._id});
//     console.log("Organizers: ", organizers);
//
//     const dates = [
//       {
//         dateFrom: moment("2016-11-10 09:30").toDate(),
//         dateTo: moment("2016-11-10 11:30").toDate(),
//       },
//       {
//         dateFrom: moment("2016-11-13 10:00").toDate(),
//         dateTo: moment("2016-11-13 11:15").toDate(),
//       },
//       {
//         dateFrom: moment("2016-11-18 20:00").toDate(),
//         dateTo: moment("2016-11-18 21:15").toDate(),
//       },
//       {
//         dateFrom: moment("2016-11-20 18:00").toDate(),
//         dateTo: moment("2016-11-20 23:00").toDate(),
//       },
//       {
//         dateFrom: moment("2016-11-29 18:00").toDate(),
//         dateTo: moment("2016-11-29 23:00").toDate(),
//       },
//     ];
//
//     const inventDate = function() {
//
//       const getRandomInt = function(min, max) {
//         min = Math.ceil(min);
//         max = Math.floor(max);
//         return Math.floor(Math.random() * (max - min)) + min;
//       };
//
//       let date = new Date();
//       date.setMonth(date.getMonth() + 1);
//       date.setDate(date.getDate() + getRandomInt(-15, 16));
//       return date;
//     };
//
//     const events = [
//       {
//         createdAt: inventDate(),
//         categoryId: categories[0],
//
//         imageId: "/assets/placeholder360x180.png",
//         bannerImageId: "http://placehold.it/795x200",
//         title: "Путь пары. Гармония взаимоотношений в&nbsp;семье",
//         description: "Полное описание Арбуз Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//         dates: dates,
//         location: {
//           city: "Казань",
//           street: "ул. Тукая",
//           building: "д. 23a",
//           additionalInfo: "вход с торца здания",
//         },
//         price: {regular: 0},
//         organizer: {
//           _id: organizers[0],
//           name: "Generic, Inc.",
//           imageId: "http://placehold.it/24x24",
//         },
//       },
//       {
//         createdAt: inventDate(),
//         categoryId: categories[0],
//         imageId: "/assets/placeholder360x180.png",
//         bannerImageId: "http://placehold.it/780x260",
//         title: "Второй в нулевой категории",
//         description: "Полное описание Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//         dates: dates,
//         location: {
//           city: "Казань",
//           street: "ул. Тукая",
//           building: "д. 23a",
//           additionalInfo: "вход с торца здания",
//         },
//         price: {regular: 800},
//         organizer: {
//           _id: organizers[0],
//           name: "Generic, Inc.",
//           imageId: "http://placehold.it/24x24",
//         },
//       },
//       {
//         createdAt: inventDate(),
//         categoryId: categories[0],
//         imageId: "/assets/placeholder360x180.png",
//         bannerImageId: "http://placehold.it/780x260",
//         title: "Третий в&nbsp;нулевой категории с&nbsp;длинным описанием",
//         description: "Полное описание Lorem ipsum dolor sit amet, *consectetur* adipisicing **elit**, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nLorem ipsum dolor sit amet, <http://example.com> consectetur adipisicing elit, sed do eiusmod tempor incididunt quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n\n---\n\n* Item 1\n* Item 2",
//         dates: dates,
//         location: {
//           city: "Казань",
//           street: "ул. Тукая",
//           building: "д. 23a",
//           additionalInfo: "вход с торца здания",
//         },
//         price: {
//           sale: 1600,
//           regular: 1900
//         },
//         organizer: {
//           _id: organizers[0],
//           name: "Generic, Inc.",
//           imageId: "http://placehold.it/24x24",
//         },
//       },
//       {
//         createdAt: inventDate(),
//         categoryId: categories[1],
//         imageId: "/assets/placeholder360x180.png",
//         bannerImageId: "http://placehold.it/780x260",
//         title: "Первый в первой категории",
//         description: "Полное описание Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//         dates: [{
//           dateFrom: moment("2016-11-11 09:30").toDate(),
//           dateTo: moment("2016-11-11 11:30").toDate(),
//         },
//         {
//           dateFrom: moment("2016-11-15 10:00").toDate(),
//           dateTo: moment("2016-11-15 11:15").toDate(),
//         },
//         {
//           dateFrom: moment("2016-11-17 20:00").toDate(),
//           dateTo: moment("2016-11-17 21:15").toDate(),
//         },
//         {
//           dateFrom: moment("2016-11-30 18:00").toDate(),
//           dateTo: moment("2016-11-30 23:00").toDate(),
//         }],
//         location: {
//           city: "Казань",
//           street: "ул. Тукая",
//           building: "д. 23a",
//           additionalInfo: "вход с торца здания",
//         },
//         price: {
//           sale: 300,
//           regular: 500
//         },
//         organizer: {
//           _id: organizers[0],
//           name: "Generic, Inc.",
//           imageId: "http://placehold.it/24x24",
//         },
//       },
//       {
//         createdAt: inventDate(),
//         categoryId: categories[1],
//         imageId: "/assets/placeholder360x180.png",
//         bannerImageId: "http://placehold.it/780x260",
//         title: "Второй в первой категории",
//         description: "Полное описание Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//         dates: [{
//           dateFrom: moment("2016-11-10 09:30").toDate(),
//           dateTo: moment("2016-11-10 11:30").toDate(),
//         },
//         {
//           dateFrom: moment("2016-11-18 20:00").toDate(),
//           dateTo: moment("2016-11-18 21:15").toDate(),
//         },
//         {
//           dateFrom: moment("2016-11-20 18:00").toDate(),
//           dateTo: moment("2016-11-20 23:00").toDate(),
//         },
//         {
//           dateFrom: moment("2016-11-29 18:00").toDate(),
//           dateTo: moment("2016-11-29 23:00").toDate(),
//         }],
//         location: {
//           city: "Казань",
//           street: "ул. Тукая",
//           building: "д. 23a",
//           additionalInfo: "вход с торца здания",
//         },
//         price: {regular: 650},
//         organizer: {
//           _id: organizers[0],
//           name: "Generic, Inc.",
//           imageId: "http://placehold.it/24x24",
//         },
//       },
//       {
//         createdAt: inventDate(),
//         categoryId: categories[1],
//         imageId: "/assets/placeholder360x180.png",
//         bannerImageId: "http://placehold.it/780x260",
//         title: "Третий в первой категории",
//         description: "Полное описание Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//         dates: dates,
//         location: {
//           city: "Казань",
//           street: "ул. Тукая",
//           building: "д. 23a",
//           additionalInfo: "вход с торца здания",
//         },
//         price: {regular: 0},
//         organizer: {
//           _id: organizers[0],
//           name: "Generic, Inc.",
//           imageId: "http://placehold.it/24x24",
//         },
//       },
//       {
//         createdAt: inventDate(),
//         categoryId: categories[1],
//         imageId: "/assets/placeholder360x180.png",
//         bannerImageId: "http://placehold.it/780x260",
//         title: "Четвертый в первой категории",
//         description: "Полное описание Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//         dates: [
//           {
//             dateFrom: moment("2016-10-02 09:30").toDate(),
//             dateTo: moment("2016-10-02 11:30").toDate(),
//           },
//           {
//             dateFrom: moment("2016-10-03 10:00").toDate(),
//             dateTo: moment("2016-10-03 11:15").toDate(),
//           },
//           {
//             dateFrom: moment("2016-10-04 20:00").toDate(),
//             dateTo: moment("2016-10-04 21:15").toDate(),
//           },
//           {
//             dateFrom: moment("2016-10-15 18:00").toDate(),
//             dateTo: moment("2016-10-15 23:00").toDate(),
//           },
//           {
//             dateFrom: moment("2016-10-19 18:00").toDate(),
//             dateTo: moment("2016-10-19 23:00").toDate(),
//           },
//         ],
//         location: {
//           city: "Казань",
//           street: "ул. Тукая",
//           building: "д. 23a",
//           additionalInfo: "вход с торца здания",
//         },
//         price: {
//           sale: 1000,
//           regular: 1400
//         },
//         organizer: {
//           _id: organizers[0],
//           name: "Generic, Inc.",
//           imageId: "http://placehold.it/24x24",
//         },
//       },
//       {
//         createdAt: inventDate(),
//         categoryId: categories[2],
//         imageId: "/assets/placeholder360x180.png",
//         bannerImageId: "http://placehold.it/780x260",
//         title: "Первый во второй категории",
//         description: "Полное описание Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//         dates: [
//           {
//             dateFrom: moment("2016-11-13 10:00").toDate(),
//             dateTo: moment("2016-11-13 11:15").toDate(),
//           },
//           {
//             dateFrom: moment("2016-11-15 20:00").toDate(),
//             dateTo: moment("2016-11-15 21:15").toDate(),
//           },
//         ],
//         location: {
//           city: "Казань",
//           street: "ул. Тукая",
//           building: "д. 23a",
//           additionalInfo: "вход с торца здания",
//         },
//         price: {regular: 0, sale: 0},
//         organizer: {
//           _id: organizers[0],
//           name: "Generic, Inc.",
//           imageId: "http://placehold.it/24x24",
//         },
//       },
//       {
//         createdAt: inventDate(),
//         categoryId: categories[2],
//         imageId: "/assets/placeholder360x180.png",
//         bannerImageId: "http://placehold.it/780x260",
//         title: "Второй во второй категории",
//         description: "Полное описание Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//         dates: [
//           {
//             dateFrom: moment("2016-11-29 12:00").toDate(),
//             dateTo: moment("2016-11-29 23:00").toDate(),
//             info: "Перерыв с 13:00 до 14:00",
//           },
//         ],
//         location: {
//           city: "Казань",
//           street: "ул. Баки Урманче",
//           building: "д. 23a",
//           additionalInfo: "вход с торца здания",
//         },
//         price: {sale: 0, regular: 100},
//         organizer: {
//           _id: organizers[0],
//           name: "Generic, Inc.",
//           imageId: "http://placehold.it/24x24",
//         },
//       },
//       {
//         createdAt: inventDate(),
//         categoryId: categories[3],
//         imageId: "/assets/placeholder360x180.png",
//         bannerImageId: "http://placehold.it/780x260",
//         title: "Единственный в третьей категории",
//         description: "Полное описание Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//         dates: [
//           {
//             dateFrom: moment("2016-11-12 09:30").toDate(),
//             dateTo: moment("2016-11-12 11:30").toDate(),
//             info: "Дополнительная информация"
//           },
//           {
//             dateFrom: moment("2016-11-14 20:00").toDate(),
//             dateTo: moment("2016-11-14 21:15").toDate(),
//           },
//           {
//             dateFrom: moment("2016-11-15 18:00").toDate(),
//             dateTo: moment("2016-11-15 23:00").toDate(),
//             info: "Доп. информация"
//           },
//         ],
//         location: {
//           city: "Казань",
//           street: "ул. Баки Урманче",
//           building: "д. 23a",
//           additionalInfo: "вход с торца здания",
//         },
//         price: {regular: 200},
//         organizer: {
//           _id: organizers[0],
//           name: "Generic, Inc.",
//           imageId: "http://placehold.it/24x24",
//         },
//       },
//     ];
//
//     for (let i = 0; i < 20; i++) {
//       events.forEach((event) => {
//         Events.insert(event);
//       });
//     }
//
//   }
//
//   console.log(Organizers.find().count() + " organizers in total.");
//   console.log(Events.find().count() + " events in total.");
//
// });
