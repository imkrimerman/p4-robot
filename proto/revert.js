'use strict'
var opened = require('./opened'),
  exec = require('./exec');
/***************************************************************************
 *
 * Revert
 *
 **************************************************************************/
/**
 * Revert file
 * @param {String} path
 * @returns {*}
 */
module.exports = function(path) {
  if (opened.is(path)) {
    return exec('revert ' + path);
  }
  return false;
};
