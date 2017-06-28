export const CoachesSchema = new SimpleSchema({

  _id: {
    type: String,
    autoform: {
      hidden: true,
    }
  },
  organizerId: {
    type: String,
    autoform: {
      hidden: true,
    }
  },

  name: {
    type: String,
    label: "Имя, [отчество], фамилия",
    min: 4,
    max: 100,
    autoform: {
      group: "Основная информация",
    },
  },
  bio: {
    type: String,
    label: "О себе",
    max: 2000,
    optional: true,
    autoform: {
      group: "Основная информация",
      type: "textarea",
      rows: 3
    }
  },
  profilePicId: {
    type: String,
    optional: true,
    label: "Фотография",
    autoform: {
      group: "Основная информация",
      type: 'fileUpload',
      collection: 'UserFiles',
      uploadTemplate: 'uploadField',
      previewTemplate: 'uploadPreview',
      template: "bootstrap3",
    },
  },

  socialLinkVK: {
    type: 'String',
    label: "Ссылка ВКонтакте",
    optional: true,
    autoform: {
      group: "Ссылки на социальные сети",
      'data-prefix': "http://vk.com/",
    },
  },
  socialLinkOdnoklassniki: {
    type: 'String',
    label: "Ссылка Одноклассники",
    optional: true,
    autoform: {
      group: "Ссылки на социальные сети",
      'data-prefix': "http://ok.ru/",
    },
  },
  socialLinkFacebook: {
    type: 'String',
    label: "Ссылка Facebook",
    optional: true,
    autoform: {
      group: "Ссылки на социальные сети",
      'data-prefix': "http://facebook.com/",
    },
  },
  socialLinkYouTube: {
    type: 'String',
    label: "Ссылка YouTube",
    optional: true,
    autoform: {
      group: "Ссылки на социальные сети",
      'data-prefix': "http://youtube.com/",
    },
  },
  socialLinkTwitter: {
    type: 'String',
    label: "Ссылка Twitter",
    optional: true,
    autoform: {
      group: "Ссылки на социальные сети",
      'data-prefix': "http://twitter.com/",
    },
  },

});
