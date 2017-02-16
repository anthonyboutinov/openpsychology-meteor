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

// Template.registerHelper("mergeAsClones", function (obj1, obj2) {
//   console.log(obj1, obj2);
//   const mergedClones = _extend(_.clone(obj1), obj2);
//   console.log("mergedClones: ",mergedClones);
//   return mergedClones;
// });
