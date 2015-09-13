'use strict'
var nodePath = require('path')
  , val = require('im.val')
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
 * @returns {*}
 */
module.exports = function(path, changelist) {
  changelist = val(changelist, this.config.defaultChangelist);
  this.$$fire('unlock', {path: path, changelist: changelist});
  return this.exec('unlock -c ' + changelist + ' ' + path);
};

/**
 * Release the lock on file using OS file permissions.
 * @param {String} path
 * @returns {*}
 */
module.exports.dirty = function(path) {
  path = nodePath.isAbsolute(path) ? path : nodePath.join(process.cwd(), path);
  return shell.chmod('u+w ', path);
}
