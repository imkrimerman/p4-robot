'use strict'
var opened = require('./opened'),
  exec = require('./exec');
/***************************************************************************
 *
 * Open file in edit mode
 *
 **************************************************************************/
module.exports = function(path, changelist) {
  if (! opened.is(path)) {
    return exec('edit -c ' + changelist + ' ' + path);
  }
  return false;
};
