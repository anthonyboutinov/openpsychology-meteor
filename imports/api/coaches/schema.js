const CoachSchema = new SimpleSchema({

  _id: {
    type: String
  },
  organizerId: {
    type: String
  },

  name: {
    type: String,
    label: "Имя, фамилия",
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
  profilePicUrl: {
    type: String,
    optional: true,
    label: "Фотография",
    autoform: {
      group: "Основная информация",
    },
  },

  socialLinkVK: {
    type: 'String',
    label: "Ссылка ВКонтакте",
    optional: true,
    autoform: {
      group: "Ссылки на социальные сети",
    },
  },
  socialLinkOdnoklassniki: {
    type: 'String',
    label: "Ссылка Одноклассники",
    optional: true,
    autoform: {
      group: "Ссылки на социальные сети",
    },
  },
  socialLinkFacebook: {
    type: 'String',
    label: "Ссылка Facebook",
    optional: true,
    autoform: {
      group: "Ссылки на социальные сети",
    },
  },
  socialLinkYouTube: {
    type: 'String',
    label: "Ссылка YouTube",
    optional: true,
    autoform: {
      group: "Ссылки на социальные сети",
    },
  },
  socialLinkTwitter: {
    type: 'String',
    label: "Ссылка Twitter",
    optional: true,
    autoform: {
      group: "Ссылки на социальные сети",
    },
  },

});
