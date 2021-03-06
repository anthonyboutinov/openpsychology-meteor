import { Categories }  from '/imports/api/categories';

/*
 * Set up Categories
 */

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

  console.log(Categories.find().count() + " categories in total.");

};
