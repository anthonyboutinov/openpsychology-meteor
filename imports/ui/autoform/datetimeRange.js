Template["afFormGroup_datetimeRange"].helpers({
  afFieldInputAtts: function () {
    var atts = _.omit(this.afFieldInputAtts || {}, 'input-col-class');
    atts["data-schema-key"] = atts.name;
    // We have a special template for check boxes, but otherwise we
    // want to use the same as those defined for bootstrap3 template.
    if (AutoForm.getInputType(this.afFieldInputAtts) === "boolean-checkbox") {
      atts.template = "bootstrap3-horizontal";
    } else {
      atts.template = "bootstrap3";
    }
    return atts;
  },
  afFieldLabelAtts: function () {
    var atts = _.clone(this.afFieldLabelAtts || {});
    // Add bootstrap class
    atts = AutoForm.Utility.addClass(atts, "control-label");
    return atts;
  },
  rightColumnClass: function () {
    var atts = this.afFieldInputAtts || {};
    return atts['input-col-class'] || "";
  },
  skipLabel: function () {
    var self = this;

    var type = AutoForm.getInputType(self.afFieldInputAtts);
    return (self.skipLabel || (type === "boolean-checkbox" && !self.afFieldInputAtts.leftLabel));
  },

  hideThis: function() {
    return this.afFieldInputAtts.name.indexOf("dateTo") >= 0 ? "hidden" : false;
  }
});

Template["afFormGroup_datetimeRange"].onRendered(function(){

  $('[dp-type="datetime"]').daterangepicker({
    "showWeekNumbers": true,
    "timePicker": true,
    "timePicker24Hour": true,
    "timePickerIncrement": 5,
    "autoApply": true,
    "dateLimit": {
        "days": 1
    },
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
    },
    "opens": "right"

  });

});
