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
 * @param {Object} execOptions
 * @returns {*}
 */
module.exports = function(path, changelist, execOptions) {
  if (this.opened(path)) {
    var cmd = 'reopen -c ' + changelist + ' ' + path;
    return this.exec(cmd, execOptions, 'reopen', {path: path, changelist: changelist});
  }
  return false;
};
