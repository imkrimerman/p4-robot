'use strict'
var _ = require('lodash');
/***************************************************************************
 *
 * Default value assigner
 *
 **************************************************************************/
/**
 * Returns value if not undefined or null, otherwise returns defaults or null
 * @param {*} value
 * @param {*|undefined} defaults
 * @param {Function|undefined} checker
 * @returns {*}
 */
module.exports = function(value, defaults, checker) {
  // if defaults not specified then assign notDefined ($__NULL__$) value
  defaults = defaults != null ? defaults : module.exports.notDefined;
  // if value and checker is specified then use it to additionally check value
  if (_.isFunction(checker) && value != null) {
    // if checker returns true then we are good
    if (checker(value)) return value;
    // otherwise return defaults
    return defaults;
  }
  // if value not specified (null, undefined) return defaults, otherwise return value;
  return value != null ? value : defaults;
};

/**
 * Value that can represent not defined state.
 * @type {string}
 */
module.exports.notDefined = '$__NULL__$';
