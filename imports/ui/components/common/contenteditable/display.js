import './display.html';

import { ReactiveDict } from 'meteor/reactive-dict';

Template.contenteditable.onCreated(function() {
  this.data.state = new ReactiveDict();
  this.data.state.set('storedValue', false);
});

Template.contenteditable.helpers({
  displayValue: function() {
    return this.state.get("storedValue") ? false : this.value;
  },
});

Template.contenteditable.events({
  "dblclick [data-conteneditable='true']": function(event, template) {
    template.data.state.set('storedValue', this.value);
  },
});
