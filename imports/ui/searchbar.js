let animateSearchbarOnAndOff = function(showSearchbar) {
  if (showSearchbar == "true") {
    this.$(".animated-slide-down").css("max-height", this.$(".animated-slide-down")[0].scrollHeight); // TODO: requires update on window resize
    this.$("#search").focus();
    console.log("Animate In Searchbar");
  } else {
    this.$(".animated-slide-down").css("max-height", 0); // TODO: requires update on window resize
    console.log("Animate Out Searchbar");
  }
}

Template.searchbar.helpers({
  'showSearchbarActive': function() {
    console.log(this.showSearchbar);
    try {
      animateSearchbarOnAndOff(this.showSearchbar);
    } catch (err) {
      // Do nothing.
      // The error will always occur when the template is being loaded but is not yet rendered.
    }

    return this.showSearchbar;
  }
});


Template.searchbar.onRendered(function() {

  // this.$(".animated-slide-down").css("max-height", this.$(".animated-slide-down")[0].scrollHeight); // TODO: requires update on window resize
  // this.$("#search").focus();

  animateSearchbarOnAndOff(this.showSearchbar);



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
