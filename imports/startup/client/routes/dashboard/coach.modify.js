import { Organizers } from '/imports/api/organizers/collection.js';
import { Coaches } from '/imports/api/coaches/collection.js';

/*
----------------------------
Dashboard.Organizers.Coach.Modify route
----------------------------
*/
Router.route("/dashboard/organizer/:organizerId/coach/:coachId?", function() {
  this.subscribe('organizers.managedByUser').wait();

  if (this.params.coachId) {
    this.subscribe('coach', this.params.coachId).wait();
  }

  this.layout('dashboardLayout', {
    data: {
      subscriptionsReady: () => {
        return this.ready();
      },
      organizers: () => {
        return Organizers.find({}, {orderBy: {'name': 1}});
      },
      organizer: () => {
        return Organizers.findOne({_id: this.params.organizerId});
      },
      coach: () => {
        if (this.params.coachId) {
          return Coaches.findOne(this.params.coachId);
        } else {
          return null;
        }
      },
    }
  });
  if (this.ready()) {
    this.render('dashboardCoachModify');
  } else {
    this.render('loading');
  };

}, {
  name: "dashboard.organizer.coach.modify"
});
