Template.searchbar.helpers({

});


Template.searchbar.onRendered(function() {

  this.$(".animated-slide-down").css("max-height", this.$(".animated-slide-down")[0].scrollHeight); // TODO: requires update on window resize
  this.$("#search").focus();

  this.$('#filter-datepicker').datepicker({
    maxViewMode: 2,
    format: 'dd.mm.yyyy',
    startDate: '0d',
    clearBtn: true,
    language: "ru",
    todayHighlight: true,
    beforeShowYear: function (date){
      if (date.getFullYear() < 2016) {
        return false;
      }
    }
  });
});
