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
      publishLimit: 9,
      link: "/",
    },
    {
      name: "Тренинги — Топ",
      abbreviation: "t",
      refKind: "events",
      publishLimit: 3,
      acceptsOnlyWithMatchingAbbreviation: true,
      link: "/search/t",
    },
    {
      name: "Семинары — Топ",
      abbreviation: "s",
      refKind: "events",
      publishLimit: 3,
      acceptsOnlyWithMatchingAbbreviation: true,
      link: "/search/s",
    },
    {
      name: "Образование — Топ",
      abbreviation: "e",
      refKind: "events",
      publishLimit: 3,
      acceptsOnlyWithMatchingAbbreviation: true,
      link: "/search/e",
    },
    {
      name: "Мероприятия онлайн — Топ",
      abbreviation: "o",
      refKind: "events",
      publishLimit: 3,
      acceptsOnlyWithMatchingAbbreviation: true,
      link: "/search/o",
    },
  ];

  groups.forEach((group) => {
    Groups.insert(group);
  });

  console.log(Groups.find().count() + " groups in total.");

};
