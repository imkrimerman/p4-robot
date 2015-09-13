'use strict'
var add = require('./add'),
  edit = require('./edit'),
  unlock = require('./unlock'),
  val = require('../utils/val');
/***************************************************************************
 *
 * Add or edit
 *
 **************************************************************************/
/**
 * Opens file for edit if it's in perforce then executes callback.
 * If file is not in perforce, will execute callback and then add file to perforce.
 * If force is specified will change file permissions to 777 after file is added.
 * Only for sync callback.
 * @param {String} path
 * @param {Function} cb - sync callback
 * @param {boolean} force
 * @returns {Object|boolean|*}
 */
module.exports = function(path, cb, force) {
  force = val(force, false);
  cb = val(cb, function() {});
  // try to open for edit
  var result = edit(path);
  // execute callback
  cb(path);
  // if we didn't open file for edit
  if (! result) {
    // try to add file
    result = add(path);
    // if force then change file permission with OS
    if (force) unlock.dirty(path);
  }
  return result;
};
