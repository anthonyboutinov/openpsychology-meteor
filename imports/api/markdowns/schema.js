export const MarkdownsSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Наименование (на английском, URL-совместимое, не изменять!)",
    autoform: {
      group: "Техническая информация",
    }
  },
  title: {
    type: String,
    label: "Название (используется в заголовке страницы)",
    autoform: {
      group: "Содержимое",
    }
  },
  data: {
    type: 'markdown',
    label: "Данные",
    autoform: {
      type: "markdown",
      group: "Содержимое",
    }
  },
});
