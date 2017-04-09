Meteor.startup(() => {

  import { Categories }  from '/imports/api/categories/index.js';
  import { Markdowns }  from '/imports/api/markdowns/index.js';



  /*
   * Set up admin accounts
   */

  const hasAdmin = Meteor.users.findOne( { 'emails.address': 'anton4488@gmail.com' } );

  if ( !hasAdmin ) {
    Accounts.createUser({
      email: 'anton4488@gmail.com',
      password: 'password',
    });
  }


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

});
