export const ConversationSchema = new SimpleSchema({


  _id: {
    type: String,
    autoform: {
      type: "hidden",
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
