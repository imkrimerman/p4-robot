'use strict'
/***************************************************************************
 *
 * Revert
 *
 **************************************************************************/
/**
 * Revert file
 * @param {String} path
 * @param {Object} execOptions
 * @returns {*}
 */
module.exports = function(path, execOptions) {
  if (this.opened(path)) {
    return this.$exec(this.event('revert', {
      command: 'revert ' + path,
      options: execOptions,
      data: { path: path }
    }));
  }
  return false;
};
