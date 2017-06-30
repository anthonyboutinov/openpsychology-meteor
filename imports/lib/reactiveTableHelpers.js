export const formatDateFn = function (value, object, key) {
  return moment(value).calendar().toLowerCase();
}

export const formatUserFn = function(value, object, key) {
  if (value == 0) return "системой";
  const user = Meteor.users.findOne(value);
  if (!user) return value;
  return user.profile.name ? user.profile.name : user.emails[0].address
}

export const formatObjectFn = function(value, object, key) {
  if (!(key in object)) return "";
  const output = typeof value == "object" ? JSON.stringify(value) : value;
  const isRightAligned = typeof value == "number";
  return new Spacebars.SafeString("<pre class=\"pre-inline" + (isRightAligned ? " text-right" : "") + "\"><code>" + output + "</code></pre>");
}

export const defaultReactiveTableSettings = {
  useFontAwesome:true,
  rowsPerPage:30,
  showRowCount:true,
  showColumnToggles:true,
  enableRegex:true
}
