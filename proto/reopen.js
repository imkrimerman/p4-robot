'use strict'
var opened = require('./opened'),
  exec = require('./exec');
/***************************************************************************
 *
 * Reopen
 *
 **************************************************************************/
/**
 * Reopen file
 * @param {String} path
 * @param {String} changelist
 * @returns {*}
 */
module.exports = function(path, changelist) {
  if (opened.is(path)) {
    return exec('reopen -c ' + changelist + ' ' + path);
  }
  return false;
};
