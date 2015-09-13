'use strict'
var which = require('shelljs').which;
/***************************************************************************
 *
 * Exists
 *
 **************************************************************************/
/**
 * Checks if Perforce Command Line Tools exists
 * @returns {boolean}
 */
module.exports = function() {
  return ! ! which(this.config.paths.p4);
};
