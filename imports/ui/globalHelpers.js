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

// Allows to have multiple OR statements inside {{#if ...}}
//
// Example: {{#if eitherIsTrue (a foo='bar') (b 'one' 'two' 'three') c d}}
// where a, b, c, d can be variables or other helpers with infinite number parameters
Template.registerHelper("eitherIsTrue", function() {
  const statements = _.initial(arguments);
  for (var i = 0; i < statements.length; i++) {
    if (statements[i]) {
      return true;
    }
  }
  return false;
});
