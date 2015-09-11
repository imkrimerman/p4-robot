'use strict'
var opened = require('./opened'),
  exec = require('./exec');
/***************************************************************************
 *
 * Reopen file
 *
 **************************************************************************/
module.exports = function(path, changelist) {
  if (opened.is(path)) {
    return exec('reopen -c ' + changelist + ' ' + path);
  }
  return false;
};
