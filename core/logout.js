'use strict'
/***************************************************************************
 *
 * Logout
 *
 **************************************************************************/
/**
 * Logs out from Perforce
 * @returns {*}
 */
module.exports = function() {
  this.$$fire('logout');
  return this.exec('logout');
};
