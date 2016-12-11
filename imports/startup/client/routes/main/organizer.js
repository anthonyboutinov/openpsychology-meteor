import { Categories }  from '/imports/api/categories/index.js';
import { Events }      from '/imports/api/events/collection.js';
import { Organizers } from '/imports/api/organizers/collection.js';

let QUERY_LIMIT = 6 * 5;

/*
----------------------------
Organizer route
----------------------------
*/
Router.route("/organizer/:_id", function() {
  this.subscribe('categories').wait();
  this.subscribe('organizer', this.params._id).wait();
  this.subscribe('events.byOrganizer', {
    _idOrganizer: this.params._id,
    addFindParams: {
      isPublished: true,
    },
    options: {
      orderBy: {'dates.dateFrom': -1},
      limit: QUERY_LIMIT,
    }
  }).wait();
  this.layout('defaultLayout', {
    data: {
      subscriptionsReady: () => {
        return this.ready();
      },
      events_: () => {
        return Events.find();
      },
      organizer: Organizers.findOne({ _id: this.params._id }),
    }
  });
  if (this.ready()) {
    this.render('organizer');
  } else {
    this.render('loading');
  };

}, {
  name: "organizer"
});
