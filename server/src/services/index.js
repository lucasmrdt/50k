const users = require('./users/users.service.js');
const enFr = require('./en-fr/en-fr.service.js');
const enWordlist = require('./en-wordlist/en-wordlist.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(enFr);
  app.configure(enWordlist);
};
