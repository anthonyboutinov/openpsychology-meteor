export const formatDateFn = function (value, object, key) {
  return moment(value).calendar();
}

export const formatUserFn = function(value, object, key) {
  console.log(value);
  if (value == 0) return "Системой";
  const user = Meteor.users.findOne(value);
  if (!user) return value;
  return user.profile.name ? user.profile.name : user.emails[0].address
}

export const defaultReactiveTableSettings = {
  useFontAwesome:true,
  rowsPerPage:30,
  showRowCount:true,
  showColumnToggles:true,
  enableRegex:true
}
