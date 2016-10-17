
Template.navbar.helpers({
  "searchbarActive": function() {
    let a = TemplateVar.get(Template.defaultLayout, 'showSearchbar') ? "active" : "false";
    console.log(TemplateVar.get(Template.defaultLayout, 'showSearchbar'));
    console.log(a);
    return a;
  }
});
