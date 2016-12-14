function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

Router.route('/rest-api/users/select', { where: 'server' })
  .get(function () {
    if (!this.params || !this.params.query || !this.params.query.q) {
      return null;
    }
    const query = this.params.query.q;
    console.log(query);
    const regexEmail = new RegExp("^" + escapeRegExp(query), "i");
    const regexName = new RegExp(escapeRegExp(query), "i");
    const users = Meteor.users.find({
      $or: [
        {'emails.0.address': { $regex: regexEmail }},
        {'profile.name': { $regex: regexName }}
      ]
    }, {
      limit: 5,
      sort: {'emails.0.address': 1},
      fields: {
        '_id': 1,
        'emails': 1,
        'profile.name': 1
      }
    }).map(function(doc) {
      const name = doc.profile.name;
      return {
        id: doc._id,
        text: doc.emails[0].address + (name ? " (" + name + ")" : "")
      }
    });
    console.log(users);
    this.response.setHeader('Content-Type', 'application/json');
    this.response.end(JSON.stringify(users));
  });
