'use strict'
var opened = require('./opened'),
  exec = require('./exec');
/***************************************************************************
 *
 * Opens file in add mode
 *
 **************************************************************************/
/**
 * Opens file in add mode
 * @param {String} path
 * @param {String} changelist
 * @returns {Object|boolean}
 */
module.exports = function(path, changelist) {
  // open file in add mode only if it's not opened yet
  if (! opened.is(path)) {
    return exec('add -c ' + changelist + ' ' + path);
  }
  return false;
};
