Security.defineMethod('ifOwns', {
  fetch: [],
  transform: null,
  allow(type, arg, userId, doc) {
    return userId && doc.ownerId === userId;
  },
});
