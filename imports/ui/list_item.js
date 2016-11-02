Template.list_item.helpers({
  nbsp: function(str) {
    return str.replace(/&nbsp;/g, '\u00a0');
  },
  formatedDate: function(date) {
    return moment(date).format('llll');
  },
  calenderDate: function(date) {
    return moment(date).calendar();
  },
});
