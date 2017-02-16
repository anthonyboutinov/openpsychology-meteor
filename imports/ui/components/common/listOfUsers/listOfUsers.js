import './listOfUsers.html';

Template.listOfUsers.helpers({
  usersProcessed() {
    return this.users.map((user)=>{
      user.eventId = this.eventId;
      console.log(user);
      return user;
    });
  },
});
