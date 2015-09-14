'use strict'
var val = require('im.val');
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
  if (! this.opened(path)) {
    changelist = val(changelist, this.config.defaultChangelist);
    this.$$fire('add', { path: path, changelist: changelist });
    return this.exec('add -c ' + changelist + ' ' + path);
  }
  return false;
};
