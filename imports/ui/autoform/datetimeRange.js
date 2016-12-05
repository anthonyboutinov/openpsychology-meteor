// Template["afFormGroup_datetimeRange"].helpers({
//   afFieldInputAtts: function () {
//     console.log(this);
//     var atts = _.omit(this.afFieldInputAtts || {}, 'input-col-class');
//     atts["data-schema-key"] = atts.name;
//     // We have a special template for check boxes, but otherwise we
//     // want to use the same as those defined for bootstrap3 template.
//     if (AutoForm.getInputType(this.afFieldInputAtts) === "boolean-checkbox") {
//       atts.template = "bootstrap3-horizontal";
//     } else {
//       atts.template = "bootstrap3";
//     }
//     console.log(atts);
//     return atts;
//   },
//   afFieldLabelAtts: function () {
//     var atts = _.clone(this.afFieldLabelAtts || {});
//     // Add bootstrap class
//     atts = AutoForm.Utility.addClass(atts, "control-label");
//     return atts;
//   },
//   rightColumnClass: function () {
//     var atts = this.afFieldInputAtts || {};
//     return atts['input-col-class'] || "";
//   },
//   skipLabel: function () {
//     var self = this;
//
//     var type = AutoForm.getInputType(self.afFieldInputAtts);
//     return (self.skipLabel || (type === "boolean-checkbox" && !self.afFieldInputAtts.leftLabel));
//   },
// });

AutoForm.addInputType("datetimerange", {
  template: "afInputDateTimeRange",
  // valueIn: function (val) {
  //   //convert Date to string value
  //   // return AutoForm.valueConverters.dateToNormalizedForcedUtcGlobalDateAndTimeString(val);
  //   return val;
  // },
  // valueOut: function () {
  //   // var val = this.val();
  //   // val = (typeof val === "string") ? val.replace(/ /g, "T") : val;
  //   // if (AutoForm.Utility.isValidNormalizedForcedUtcGlobalDateAndTimeString(val)) {
  //   //   //Date constructor will interpret val as UTC due to ending "Z"
  //   //   return new Date(val);
  //   // } else {
  //   //   return null;
  //   // }
  //   return this.val();
  // },
  // // valueConverters: {
  // //   "string": AutoForm.valueConverters.dateToNormalizedForcedUtcGlobalDateAndTimeString,
  // //   "stringArray": AutoForm.valueConverters.dateToNormalizedForcedUtcGlobalDateAndTimeStringArray,
  // //   "number": AutoForm.valueConverters.dateToNumber,
  // //   "numberArray": AutoForm.valueConverters.dateToNumberArray,
  // //   "dateArray": AutoForm.valueConverters.dateToDateArray
  // // },
  // contextAdjust: function (context) {
  //   return context;
  //   // if (typeof context.atts.max === "undefined" && context.max instanceof Date) {
  //   //   context.atts.max = AutoForm.valueConverters.dateToNormalizedForcedUtcGlobalDateAndTimeString(context.max);
  //   // }
  //   // if (typeof context.atts.min === "undefined" && context.min instanceof Date) {
  //   //   context.atts.min = AutoForm.valueConverters.dateToNormalizedForcedUtcGlobalDateAndTimeString(context.min);
  //   // }
  //   // return context;
  // }
});


Template["afInputDateTimeRange"].onRendered(function(){

  let inputField = $('#' + this.data.atts.id);
  inputField.daterangepicker({
    "showWeekNumbers": true,
    "timePicker": true,
    "timePicker24Hour": true,
    "timePickerIncrement": 5,
    "autoApply": false,
    autoUpdateInput: false,
    "dateLimit": {
        "days": 1
    },
    "opens": "left",
    locale: {
      "format": 'DD.MM.YYYY HH:mm',
      "separator": " - ",
      "applyLabel": "Применить",
      "cancelLabel": "Отменить",
      "fromLabel": "С",
      "toLabel": "До",
      "customRangeLabel": "Custom",
      "weekLabel": "Н",
      "daysOfWeek": [
          "Вс",
          "Пн",
          "Вт",
          "Ср",
          "Чт",
          "Пт",
          "Сб"
      ],
      "monthNames": [
          "Январь",
          "Февраль",
          "Март",
          "Апрель",
          "Май",
          "Июнь",
          "Июль",
          "Август",
          "Сентябрь",
          "Октябрь",
          "Ноябрь",
          "Декабрь"
      ],
      "firstDay": 1
    }
  });
  inputField.val(this.data.value);

  inputField.on('apply.daterangepicker', function(ev, picker) {
      $(this).val(picker.startDate.format('DD.MM.YYYY HH:mm') + ' - ' + picker.endDate.format('DD.MM.YYYY HH:mm'));
  });

});
