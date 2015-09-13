'use strict'
/***************************************************************************
 *
 * Perforce Robot Core
 *
 **************************************************************************/
/**
 * Perforce Robot prototype
 * @type {Object}
 */
module.exports = {
  add: require('./add'),
  chmod: require('./chmod'),
  client: require('./client'),
  edit: require('./edit'),
  editOrAdd: require('./editOrAdd'),
  exec: require('./exec'),
  exists: require('./exists'),
  login: require('./login'),
  opened: require('./opened'),
  reopen: require('./reopen'),
  revert: require('./revert'),
  test: require('./test'),
  unlock: require('./unlock'),
};
