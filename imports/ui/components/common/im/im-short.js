import './im-short.html';

function username(user) {
  return user.profile.name ? user.profile.name : user.emails[0].address;
}

// this is either {
//   _id: String,
//   profile: Object,
//   emails: Array,
//   eventId: String
// }
// or
// {
//   users: Cursor,
//   eventId: String
// }

Template['im-short'].helpers({
  username: function() {
    if (this.profile) {
      return username(this);
    } else {
      return this.users.map((user)=> {return username(user)}).join(", ");
    }
  },
});


Template['im-short'].events({
  'click [data-action="close"]'(event, template) {
    event.preventDefault();
    Blaze.remove(template.view);
  },
  'click button'(event, template) {
    event.preventDefault();
    const message = template.$('textarea').val();
    const userIds = template.data.users ? template.data.users.map((user)=>{return user._id}) : template.data._id;
    console.log(message, userIds);
    Blaze.remove(template.view);
  }
});
