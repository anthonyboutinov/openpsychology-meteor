import { Categories }  from '/imports/api/categories/index.js';
import { Events }      from '/imports/api/events/collection.js';
import { Organizers } from '/imports/api/organizers/collection.js';
import { composeTitle } from '/imports/startup/client/routes/composeTitle.js';

let QUERY_LIMIT = 6 * 5;

/*
----------------------------
Organizer route
----------------------------
*/
Router.route("/organizer/:_id", function() {
  this.subscribe('categories').wait();
  this.subscribe('organizer', this.params._id).wait();
  if (Meteor.userId()) {
    this.subscribe('organizers.managedByUser').wait();
  }

  this.subscribe('events.byOrganizer', {
    _idOrganizer: this.params._id,
    addFindParams: {
      isPublished: true,
    },
    options: {
      sort: {'dates.dateFrom': -1},
      limit: QUERY_LIMIT,
    }
  }).wait();
  this.layout('mergedLayout', {
    data: {
      subscriptionsReady: () => {
        return this.ready();
      },
      events_: () => {
        return Events.find();
      },
      organizer: Organizers.findOne({ _id: this.params._id }),
      isMain: true,
    }
  });
  if (this.ready()) {
    this.render('organizer');
  } else {
    this.render('loading');
  };

}, {
  name: "organizer",
  title: _.throttle(function() {
    const data = this._layout._data();
    let title = data && data.organizer ? data.organizer.name : false;
    SessionStore.set("router.mainSiteSection.lastVisitedPageTitle", title);
    title = composeTitle(title);
    return title;
  }, 300),
});
