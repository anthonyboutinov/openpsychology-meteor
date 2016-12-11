import './boolean-radios.html';

AutoForm.addInputType("boolean-radios-optimized", {
  template: "afBooleanRadioGroupOptimized",
  valueOut: function () {
    if (this.find('input[value=false]').is(":checked")) {
      return false;
    } else if (this.find('input[value=true]').is(":checked")) {
      return true;
    } else if (this.find('input[value=null]').is(":checked")) {
      return null;
    }
  },
  valueConverters: {
    "string": AutoForm.valueConverters.booleanToString,
    "stringArray": AutoForm.valueConverters.booleanToStringArray,
    "number": AutoForm.valueConverters.booleanToNumber,
    "numberArray": AutoForm.valueConverters.booleanToNumberArray
  }
});

Template.afBooleanRadioGroupOptimized.helpers({
  falseAtts: function falseAtts() {
    var atts = _.omit(this.atts, 'trueLabel', 'falseLabel', 'nullLabel', 'data-schema-key', 'data-defaultValue');
    if (this.value === false || (this.value !== true && this.value !== false && this.atts['data-defaultValue'] === false)) {
      atts.checked = "";
    }
    return atts;
  },
  trueAtts: function trueAtts() {
    var atts = _.omit(this.atts, 'trueLabel', 'falseLabel', 'nullLabel', 'data-schema-key', 'data-defaultValue');
    if (this.value === true || (this.value !== true && this.value !== false && this.atts['data-defaultValue'] === true)) {
      atts.checked = "";
    }
    return atts;
  },
  nullAtts: function nullAtts() {
    var atts = _.omit(this.atts, 'trueLabel', 'falseLabel', 'nullLabel', 'data-schema-key', 'data-defaultValue');
    if (this.value !== true && this.value !== false) {
      atts.checked = "";
    }
    return atts;
  },
  dsk: function () {
    return {'data-schema-key': this.atts['data-schema-key']};
  }
});
