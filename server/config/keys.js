// keys.js - figure out what set of credentials to return
// either: we are in production - return the prod set of keys
// or: we are in development - return the dev keys!!!
if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line global-require
  module.exports = require('./prod');
} else {
  // eslint-disable-next-line global-require
  module.exports = require('./dev');
}
