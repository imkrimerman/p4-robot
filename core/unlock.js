'use strict'
var nodePath = require('path')
  , val = require('im.val')
  , isAbsolute = require('path-is-absolute')
  , shell = require('../utils/shell');
/***************************************************************************
 *
 * Unlock
 *
 **************************************************************************/
/**
 * Release the lock on a file.
 * @param {String} path
 * @param {String} changelist
 * @param {Object} execOptions
 * @returns {*}
 */
module.exports = function(path, changelist, execOptions) {
  changelist = val(changelist, this.config.defaultChangelist);
  return this.$exec(this.event('unlock', {
    command: 'unlock -c ' + changelist + ' ' + path,
    options: execOptions,
    data: { path: path, changelist: changelist }
  }));
};

/**
 * Release the lock on file using OS file permissions.
 * @param {String} path
 * @returns {*}
 */
module.exports.dirty = function(path) {
  path = isAbsolute(path) ? path : nodePath.join(process.cwd(), path);
  return shell.chmod('u+w ', path);
}
