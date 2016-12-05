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
