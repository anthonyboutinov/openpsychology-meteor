import { Markdowns }  from '/imports/api/markdowns';


/*
 * Set up Markdowns
 */

if (Markdowns.find().count() == 0) {

  const markdowns = [
    {
      name: "terms",
      title: "Условия пользования",
      description: "[Описание для результатов поисковых запросов]",
      data: Assets.getText("terms.md"),
    },
  ];

  markdowns.forEach((m) => {
    Markdowns.insert(m);
  });

  console.log(Markdowns.find().count() + " markdowns in total.");

};
