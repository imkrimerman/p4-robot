'use strict'
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
  if (this.opened.is(path)) {
    this.$$fire('reopen', {path: path, changelist: changelist});
    return this.exec('reopen -c ' + changelist + ' ' + path);
  }
  return false;
};
