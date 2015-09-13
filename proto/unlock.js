'use strict'
var shell = require('../utils/shell'),
  nodePath = require('path'),
  exec = require('./exec'),
  val = require('../utils/val');
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
  return exec('unlock -c ' + changelist + ' ' + path);
};

/**
 * Release the lock on file using OS file permissions.
 * @param {String} path
 * @returns {*}
 */
module.exports.dirty = function(path) {
  return shell.chmod('u+w ' + nodePath.join(process.cwd(), path));
}
