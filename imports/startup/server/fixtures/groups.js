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
      maxItems: 9,
    },
    {
      name: "Тренинги — Топ",
      abbreviation: "t",
      refKind: "events",
      maxItems: 3,
      acceptsOnlyWithMatchingAbbreviation: true,
    },
    {
      name: "Семинары — Топ",
      abbreviation: "s",
      refKind: "events",
      maxItems: 3,
      acceptsOnlyWithMatchingAbbreviation: true,
    },
    {
      name: "Образование — Топ",
      abbreviation: "e",
      refKind: "events",
      maxItems: 3,
      acceptsOnlyWithMatchingAbbreviation: true,
    },
    {
      name: "Мероприятия онлайн — Топ",
      abbreviation: "o",
      refKind: "events",
      maxItems: 3,
      acceptsOnlyWithMatchingAbbreviation: true,
    },
  ];

  groups.forEach((group) => {
    Groups.insert(group);
  });

  console.log(Groups.find().count() + " groups in total.");

};
