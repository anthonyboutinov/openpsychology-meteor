export const MessageSchema = new SimpleSchema({

  _id: {
    type: String,
    autoform: {
      type: "hidden",
    }
  },

  conversationId: {
    type: String
  },

  // It is required to differetiate between IDs of organizers and people (may overlap)
  direction: {
    type: String,
    // accepts:
    // "O2P" —- organizer to person
    // "P2O" -- person to organizer
  },

  // use markdown
  body: {
    type: String,
    max: 5000,
  },

  isRead: {
    type: Boolean,
    defaultValue: false,
  },

});
