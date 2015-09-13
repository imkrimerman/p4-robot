'use strict'
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
  if (! this.opened.is(path)) {
    this.$$fire('edit', { path: path, changelist: changelist });
    return this.exec('edit -c ' + changelist + ' ' + path);
  }
  return false;
};
