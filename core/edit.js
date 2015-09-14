'use strict'
var val = require('im.val');
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
  if (! this.opened(path)) {
    changelist = val(changelist, this.config.defaultChangelist);
    this.$$fire('edit', { path: path, changelist: changelist });
    return this.exec('edit -c ' + changelist + ' ' + path);
  }
  return false;
};
