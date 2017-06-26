export const ConversationSchema = new SimpleSchema({


  _id: {
    type: String,
    autoform: {
      hidden: true,
    }
  },

  organizerId: {
    type: String
  },

  userId: {
    type: String,
  },

  eventId: {
    type: String,
    optional: true,
  },

  lastMessageAt: {
    type: Date,
    optional: true,
  }

});
