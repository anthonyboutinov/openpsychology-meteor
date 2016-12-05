import './datetimeRange.html';

AutoForm.addInputType("datetimerange", {
  template: "afInputDateTimeRange",
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
