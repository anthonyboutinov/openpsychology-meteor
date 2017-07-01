import './contact.html';

Template.organizerInfoContatComponent.helpers({
  hasContactInformation() {
    const organizer = this.organizer;
    return organizer.socialLinkVK != null ||
           organizer.socialLinkFacebook != null ||
           organizer.socialLinkOdnoklassniki != null ||
           organizer.socialLinkYouTube != null ||
           organizer.socialLinkTwitter != null ||
           organizer.phoneNum != null ||
           organizer.email != null;
  },
});
