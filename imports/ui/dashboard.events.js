Template.dashboardEvents.helpers({
  shouldClearfix: function(index, grid) {
    return index != 0 && index % grid == 0;
  },
});
