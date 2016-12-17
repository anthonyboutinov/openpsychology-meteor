import { Organizers } from '/imports/api/organizers/collection.js';

/*
----------------------------
Dashboard.Organizer.Update route
----------------------------
*/
Router.route("/dashboard/organizer/:_id/update/:specialFormType?", function() {
  this.subscribe('organizers.managedByUser').wait();

  const pageTitle = this.params.specialFormType == "collaborators" ?
                      {short: "Редактировать участников", long: "Редактировать список участников"} :
                      (this.params.specialFormType == "resign" ?
                        {short: "Передать права", long: "Передать права на владение другой учетной записи"} :
                        {short: "Редактировать", long: "Редактировать организацию"});

  if (this.params.specialFormType) {
    this.subscribe('users.whoManageOrganizer', this.params._id).wait();
  }

  this.layout('dashboardLayout', {
    data: {
      subscriptionsReady: () => {
        return this.ready();
      },
      organizers: () => {
        return Organizers.find({}, {sort: {'name': 1}});
      },
      organizer: () => {
        return Organizers.findOne({_id: this.params._id});
      },
      specialFormType: this.params.specialFormType,
      pageTitle: pageTitle,
    }
  });
  if (this.ready()) {

    // Safety check
    //  Перекинуть на страницу редактирования участников вместо передачи прав,
    //  если участник не является обладателем огранизации
    if (this.params.specialFormType && this.params.specialFormType == "resign") {
      const org = Organizers.findOne({_id: this.params._id});
      if (org && org.ownerId != Meteor.userId()) {
        this.redirect('dashboard.organizer.update', {_id: this.params._id, specialFormType: "collaborators"});
      }
    }

    this.render('dashboardOrganizersUpdate');
  } else {
    this.render('loading');
  };

}, {
  name: "dashboard.organizer.update"
});
