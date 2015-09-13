'use strict'
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
  if (! this.opened.is(path)) {
    this.$$fire('add', { path: path, changelist: changelist });
    return this.exec('add -c ' + changelist + ' ' + path);
  }
  return false;
};
