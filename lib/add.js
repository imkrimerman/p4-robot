'use strict'
var opened = require('./opened'),
  exec = require('./exec');
/***************************************************************************
 *
 * Opens file in add mode
 *
 **************************************************************************/
module.exports = function(path, changelist) {
  if (! opened.is(path)) {
    return exec('add -c ' + changelist + ' ' + path);
  }
  return false;
};
