// /*
// ----------------------------
// Version route
// ----------------------------
// */
// Router.route('/version', function () {
//   this.layout('accountsLayout', {
//     data: {
//       subscriptionsReady: () => {
//         return this.ready();
//       },
//       isMain: true,
//     }
//   });
//   if (this.ready()) {
//     this.render('version');
//   } else {
//     this.render('loading');
//   };
// }, {
//   name: "version",
//   title: function() {
//     const title = "Текущая версия веб-приложения";
//     SessionStore.set("router.mainSiteSection.lastVisitedPageTitle", title);
//     return composeTitle(title);
//   }
// });
