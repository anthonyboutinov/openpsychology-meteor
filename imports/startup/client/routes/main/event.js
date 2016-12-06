import { Categories }  from '/imports/api/categories/index.js';
import { Events }      from '/imports/api/events/collection.js';
import { Organizers } from '/imports/api/organizers/collection.js';

/*
----------------------------
Event route
----------------------------
*/
Router.route("/event/:_id", function() {
  this.subscribe('categories').wait();
  this.subscribe('event', this.params._id).wait();
  this.subscribe('organizer.byEventId', this.params._id).wait();

  const event = Events.findOne({ _id: this.params._id });
  const organizer = Organizers.findOne();

  this.layout('defaultLayout', {
    data: {
      subscriptionsReady: () => {
        return this.ready();
      },
      event: event,
      organizer: organizer,
    }
  });
  if (this.ready()) {
    this.render('event');
  } else {
    this.render('loading');
  };

}, {
  name: "event"
});
