'use strict'
var exec = require('./exec');
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
  return exec('logout');
};
