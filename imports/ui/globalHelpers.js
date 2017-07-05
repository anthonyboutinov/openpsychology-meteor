const QUERY_LIMIT = 6 * 5;

Template.registerHelper("shouldClearfix", function(index, grid) {
  return index != 0 && index % grid == 0;
});

Template.registerHelper("nbsp", function (string) {
  if (!string) return null;
  return string.replace(/&nbsp;/g, '\u00a0');
});

Template.registerHelper("phoneNumHref", function (string) {
  // Phoneformat TAKES UP 412kB  (12% of tha code) in production! Remove this dependency, write a simple function instead!
  // return "tel:" + Phoneformat.formatE164('RU', string);
  return "tel:+7" + string;
});

Template.registerHelper("phoneNumLabel", function (string) {
  // FIXME: Phoneformat TAKES UP 412kB  (12% of tha code) in production! Remove this dependency, write a simple function instead!
  // return Phoneformat.formatLocal('RU', string);
  return "8 (" + string.substr(0, 3) + ") " + string.substr(3, 3) + "-" + string.substr(6, 2) + "-" + string.substr(8);
});

Template.registerHelper("formatedDate", function (date) {
  return moment(date).format('llll');
});

Template.registerHelper("calenderDate", function (date) {
  return moment(date).calendar();
});

Template.registerHelper("animationClass", function (index) {
  return index > QUERY_LIMIT ? "animated fadeIn" : false;
});

Template.registerHelper("log", function (subject = this) {
  console.log(subject);
});

Template.registerHelper("currentUserHasRole", function() {
  if (!Meteor.user()) { return false }
  const roles = _.initial(arguments);
  const user = Meteor.user();
  return user && user.roles && _.intersection(user.roles.__global_roles__, roles).length > 0;
})

// Allows to have multiple OR statements inside {{#if ...}}
//
// Example: {{#if eitherIsTrue (a foo='bar') (b 'one' 'two' 'three') c d}}
// where a, b, c, d can be variables or other helpers with infinite number parameters
Template.registerHelper("eitherIsTrue", function() {
  const statements = _.initial(arguments);
  // console.log("eitheristrue", this, statements);
  for (var i = 0; i < statements.length; i++) {
    if (statements[i]) {
      return true;
    }
  }
  return false;
});

Template.registerHelper("equals", function(a, b) {
  console.log(a, b);
  return a === b;
});

Template.registerHelper('currentFieldValue', function (fieldName) {
  return AutoForm.getFieldValue(fieldName) || false;
});
