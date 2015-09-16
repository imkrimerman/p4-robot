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
    return this.$exec(this.event('reopen', {
      command: 'reopen -c ' + changelist + ' ' + path,
      options: execOptions,
      data: {path: path, changelist: changelist}
    }));
  }
  return false;
};
