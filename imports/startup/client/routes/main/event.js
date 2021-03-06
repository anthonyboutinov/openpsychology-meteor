import { Categories }  from '/imports/api/categories/index.js';
import { Events }      from '/imports/api/events/collection.js';
import { Organizers } from '/imports/api/organizers/collection.js';
import { composeTitle } from '/imports/startup/client/routes/composeTitle.js';

/*
----------------------------
Event route
----------------------------
*/
Router.route("/event/:_id", function() {
  this.subscribe('categories').wait();

  this.subscribe('event', this.params._id).wait();
  this.subscribe('coaches.forEvent', this.params._id).wait();
  this.subscribe('organizer.byEventId', this.params._id).wait();
  if (Meteor.userId()) {
    this.subscribe('organizers.managedByUser').wait();
    const user = Meteor.user();
    if (user
      && user.roles
      && user.roles[Roles.GLOBAL_GROUP]
      && _.contains(user.roles[Roles.GLOBAL_GROUP], 'admin')) {
      this.subscribe('groups').wait();
    }
  }
  this.subscribe('users.registeredForEvent', this.params._id).wait();

  const event = Events.findOne(this.params._id);
  const organizer = Organizers.findOne(event.organizerId);

  this.layout('mergedLayout', {
    data() {
      if (!Events.findOne(this.params._id)) {
        this.render('notFound');
        return null;
      }
      return {
        subscriptionsReady: () => {
          return this.ready();
        },
        event: event,
        organizer: organizer,
        isMain: true,
      };
    }
  });
  if (this.ready()) {
    this.render('event');
  } else {
    this.render('loading');
  };

}, {
  name: "event",
  title: _.throttle(function() {
    const data = this._layout._data();
    const title = data ? data.event.title : false;
    SessionStore.set("router.mainSiteSection.lastVisitedPageTitle", title);
    return composeTitle(title);
  }, 300),
});
