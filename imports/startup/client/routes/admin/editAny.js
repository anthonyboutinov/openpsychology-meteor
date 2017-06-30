import { Categories }  from '/imports/api/categories/index.js';
import { Events }      from '/imports/api/events/collection.js';
import { Organizers } from '/imports/api/organizers/collection.js';
import { Groups } from '/imports/api/groups/collection.js';

/*
----------------------------
Dashboard.Home route
----------------------------
*/
Router.route("/admin/editany/:collectionName/:_id/:prevPageTitle/:prevPageIsDeepInHierarchy?", function() {
  // this.subscribe('categories').wait();

  const user = Meteor.user();
  if (!user || !_.contains(user.roles.__global_roles__, 'admin')) {
    this.redirect("/dashboard/user");
  }

  const _id = this.params._id;
  let collection;
  switch (this.params.collectionName) {
    case "groups":
      collection = Groups;
      this.subscribe("group", _id).wait();
      break;
    // case "events":
    //   collection = Events;
    //   break;
    case "organizers":
      collection = Organizers;
      this.subscribe("users.all").wait();
      this.subscribe("organizer", _id).wait();
      break;
    case "users":
      collection = Meteor.users._collection;
      this.subscribe("users.all").wait();
      break;
    default: break;
  }

  this.layout('mergedLayout', {
    data: {
      sublayoutType: "dashboardLayout",
      viewAsAdmin: true,
      subscriptionsReady: () => {
        return this.ready();
      },
      collection: collection,
      doc: () => {
        return collection.findOne(_id);
      },
      prevPageTitle: this.params.prevPageTitle,
      prevPageIsDeepInHierarchy: this.params.prevPageIsDeepInHierarchy,
    }
  });
  if (this.ready()) {
    this.render('adminEditAny');
  } else {
    this.render('loading');
  };

}, {
  name: "admin.editAny"
});
