Template.defaultLayout.events({
  "click #showSearchbar": function(event, template){
    event.preventDefault();
    TemplateVar.set('showSearchbar', true);
  },
  "click .hideSearchbar": function(event, template) {
    template.$(".animated-slide-down").css("max-height", 0);
    setTimeout(function () {
      TemplateVar.set(template, 'showSearchbar', false);
    }, 1000);
  }
});
