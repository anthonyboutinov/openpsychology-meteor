export const EventDatesSchema = new SimpleSchema({
  dateFrom: {
    type: Date,
    label: "Время начала",
    autoform: {
      label: "Время проведения",
      type: "datetimerange",
    }
  },
  dateTo: {
    type: Date,
    label: "Время окончания",
    autoform: {
      type: "hidden",
      label: false,
    }
  },
  info: {
    type: String,
    label: "Дополнительная информация",
    optional: true,
  },
});
