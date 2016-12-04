export const EventDatesSchema = new SimpleSchema({
  dateFrom: {
    type: Date,
    label: "Время начала",
  },
  dateTo: {
    type: Date,
    label: "Время окончания",
    optional: true,
  }
});
