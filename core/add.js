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
 * @param {Object} execOptions
 * @returns {Object|boolean}
 */
module.exports = function(path, changelist, execOptions) {
  // open file in add mode only if it's not opened yet
  if (! this.opened(path)) {
    changelist = val(changelist, this.config.defaultChangelist);
    this.__cache.del('opened:true');
    return this.$exec(this.event('add', {
      command: 'add -c ' + changelist + ' ' + path,
      options: execOptions,
      data: { path: path, changelist: changelist }
    }));
  }
  return false;
};
