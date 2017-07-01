export const formatDateFn = function (value, object, key) {
  if (!value) return "";
  return moment(value).calendar().toLowerCase();
}

const getUserName = function(value) {
  const user = Meteor.users.findOne(value);
  if (!user) return value;
  return user.profile.name ? user.profile.name : user.emails[0].address
}

export const formatUserFn = function(value, object, key) {
  if (value === null) return "";
  if (value === "0") return "системой";
  if (typeof value == 'object') {
    if (value.length == 0) return "";
    const mixedNames = _.reduce(value, (union, userId) => {
      const name = getUserName(userId);
      const concat = union.concat(name);
      return concat;
    }, []);
    return mixedNames.join(", ");
  }
  return getUserName(value);
}

export const formatObjectFn = function(value, object, key) {
  if (value === null) return "";
  if (value === false || value === true) {
    return new Spacebars.SafeString("<pre class=\"pre-inline\"><code>" + value + "</code></pre>");
  }
  const output = typeof value == "object" ? ( _.isArray(value) ? value.join(", ") : JSON.stringify(value) ) : value;
  // console.log(value, output);
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
