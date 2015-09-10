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
  defaults = defaults != null ? defaults : module.exports.notDefined;
  if (_.isFunction(checker) && value != null) {
    if (checker(value)) return value;
    return defaults;
  }
  return value != null ? value : defaults;
};

/**
 * Value that can represent not defined state.
 * @type {string}
 */
module.exports.notDefined = '$__NULL__$';
