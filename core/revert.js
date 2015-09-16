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
    return this.$exec('revert ' + path, execOptions, 'revert', { path: path });
  }
  return false;
};
