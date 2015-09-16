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
  lock: require('./lock'),
  login: require('./login'),
  logout: require('./logout'),
  opened: require('./opened'),
  reopen: require('./reopen'),
  revert: require('./revert'),
  submit: require('./submit'),
  sync: require('./sync'),
  test: require('./test'),
  unlock: require('./unlock'),
};
