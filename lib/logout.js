'use strict'
var exec = require('./exec');
/***************************************************************************
 *
 * Logout from Perforce
 *
 **************************************************************************/
module.exports = function() {
  return exec('logout');
};
