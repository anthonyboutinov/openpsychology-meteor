import './users';

if (Meteor.isServer) {

  import '/imports/api/categories';
  import '/imports/api/organizers';
  import '/imports/api/events';
  import '/imports/api/coaches';
  import '/imports/api/markdowns';
  import '/imports/api/messages';
  import '/imports/api/conversations';
  import '/imports/api/groups';

}
