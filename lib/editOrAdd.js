'use strict'
var add = require('./add'),
  edit = require('./edit'),
  unlock = require('./unlock'),
  val = require('../utils/val');
/***************************************************************************
 *
 * Add or edit file
 *
 **************************************************************************/
module.exports = function(path, cb, force) {
  force = val(force, false);
  var result = edit(path);
  cb(path);
  if (! result) {
    var out = add(path);
    if (force) unlock.dirty(path);
    return out;
  }
  return result;
};
