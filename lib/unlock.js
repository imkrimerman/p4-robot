'use strict'
var shell = require('../utils/shell'),
  nodePath = require('path'),
  exec = require('./exec'),
  val = require('../utils/val'),
  config = require('../config');
/***************************************************************************
 *
 * Release the lock on a file.
 *
 **************************************************************************/
module.exports = function(path, changelist) {
  changelist = val(changelist, config.defaultChangelist);
  return exec('unlock -c ' + changelist + ' ' + path);
};

/**
 * Release the lock using OS chmod.
 * @param path
 */
module.exports.dirty = function(path) {
  shell.chmod('u+w ' + nodePath.join(process.cwd(), path));
}
