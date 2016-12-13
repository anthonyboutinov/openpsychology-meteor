import './notFound.html';

import { ReactiveVar } from 'meteor/reactive-var';

Template.notFound.helpers({
  delayNotFoundMessage() {
    return Template.instance().delayNotFoundMessage.get();
  }
});

Template.notFound.onCreated(function onCreated() {
  this.delayNotFoundMessage = new ReactiveVar(true);
});

Template.notFound.onRendered(function onRendered() {
  let self = this;
  setTimeout(function onRenderedTimeout(){
    if (self && self.delayNotFoundMessage) {
      self.delayNotFoundMessage.set(false);
    }
  }, 3000); // TODO: This value may need to be adjusted with real tests over the Internet
});
