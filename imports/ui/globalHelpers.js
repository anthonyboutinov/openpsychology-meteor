Template.registerHelper("shouldClearfix", function(index, grid) {
  return index != 0 && index % grid == 0;
});

Template.registerHelper("nbsp", function (string) {
  if (!string) return null;
  return string.replace(/&nbsp;/g, '\u00a0');
});

Template.registerHelper("phoneNumHref", function (string) {
  return "tel:" + Phoneformat.formatE164('RU', string);
});

Template.registerHelper("phoneNumLabel", function (string) {
  return Phoneformat.formatLocal('RU', string);
});

Template.registerHelper("log", function (subject = this) {
  console.log(subject);
});

Template.registerHelper("currentUserHasRole", function() {
  const roles = _.initial(arguments);
  return _.intersection(Meteor.user().roles.__global_roles__, roles).length > 0;
})
