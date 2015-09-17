'use strict'
var _ = require('lodash')
  , isAbsolute = require('path-is-absolute');
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
  var which = this.$.shell.which('p4')
    ,  out = _.isString(which) && isAbsolute(which);
  this.$fire(this.event('which', { command: 'p4', output: out }));
  return out;
};
