'use strict'
var _ = require('lodash');
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
  return _.isString(this.$.shell.which('p4'));
};
