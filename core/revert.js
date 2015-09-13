'use strict'
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
  if (this.opened.is(path)) {
    this.$$fire('revert', {path: path});
    return this.exec('revert ' + path);
  }
  return false;
};
