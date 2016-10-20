Template.list.helpers({
  loopCount: function(count){
    var countArr = [];
    for (var i=0; i<count; i++){
      countArr.push({});
    }
    return countArr;
  },
  nbsp: function(str) {
    return str.replace(/&nbsp;/g, '\u00a0');
  },
  shouldClearfix: function(index, grid) {
    return index != 0 && index % grid == 0;
  },

});

Template.list.events({
  'click a[href=\'#loadMore\']': (event, template) => {
    event.preventDefault();
    const currentLimit = SessionStore.get('events.limit');
    const newLimit = currentLimit + 1;
    SessionStore.set('events.limit', newLimit);
  },
});
