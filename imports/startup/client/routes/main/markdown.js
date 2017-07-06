import { Categories }  from '/imports/api/categories/index.js';
import { Markdowns }  from '/imports/api/markdowns/index.js';
import { composeTitle } from '/imports/startup/client/routes/composeTitle.js';

/*
----------------------------
Markdown route
----------------------------
*/
Router.route('/md/:name', function () {
  this.subscribe('categories').wait();
  this.subscribe('markdown', this.params.name).wait();
  if (Meteor.userId()) {
    this.subscribe('organizers.managedByUser').wait();
  }

  this.layout('mergedLayout', {
    data: {
      subscriptionsReady: () => {
        return this.ready();
      },
      isMain: true,
      content: () => {
        return Markdowns.findOne({name: this.params.name});
      },
    }
  });
  if (this.ready()) {
    this.render('markdown');
  } else {
    this.render('loading');
  };
}, {
  name: "markdown",
  title: function() {
    const data = this._layout._data();
    const title = data ? data.content.title : false;
    SessionStore.set("router.mainSiteSection.lastVisitedPageTitle", title);
    return composeTitle(title);
  }
});
