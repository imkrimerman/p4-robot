'use strict'
var opened = require('./opened'),
  exec = require('./exec'),
  val = require('../utils/val');
/***************************************************************************
 *
 * Edit
 *
 **************************************************************************/
/**
 * Opens file in edit mode
 * @param {String} path
 * @param {String} changelist
 * @returns {Object|boolean}
 */
module.exports = function(path, changelist) {
  // open file in edit mode only if it's not opened yet
  if (! opened.is(path)) {
    return exec('edit -c ' + changelist + ' ' + path);
  }
  return false;
};
