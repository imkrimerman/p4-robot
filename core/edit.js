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
 * @param {Object} execOptions
 * @returns {Object|boolean}
 */
module.exports = function(path, changelist, execOptions) {
  // open file in edit mode only if it's not opened yet
  if (! this.opened(path)) {
    changelist = val(changelist, this.config.defaultChangelist);
    var command = 'edit -c ' + changelist + ' ' + path;
    return this.$exec(command, execOptions, 'edit', { path: path, changelist: changelist });
  }
  return false;
};
