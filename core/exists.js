'use strict'
var _ = require('lodash')
  , nodePath = require('path');
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
  var which = this.$.shell.which('p4');
  return _.isString(which) && nodePath.isAbsolute(which);
};
