import { Groups }  from '/imports/api/groups/collection.js';

/*
 * Set up Groups
 */

if (Groups.find().count() == 0) {

  const groups = [
    {
      name: "Главная — Рекомендованные",
      abbreviation: "homescreen",
      refKind: "events",
      items: [],
    },
    {
      name: "Тренинги — Топ",
      abbreviation: "t",
      refKind: "events",
      items: [],
    },
    {
      name: "Семинары — Топ",
      abbreviation: "s",
      refKind: "events",
      items: [],
    },
    {
      name: "Образование — Топ",
      abbreviation: "e",
      refKind: "events",
      items: [],
    },
    {
      name: "Мероприятия онлайн — Топ",
      abbreviation: "o",
      refKind: "events",
      items: [],
    },
  ];

  groups.forEach((group) => {
    Groups.insert(group);
  });

  console.log(Groups.find().count() + " groups in total.");

};
