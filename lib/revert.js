'use strict'
var opened = require('./opened'),
  exec = require('./exec');
/***************************************************************************
 *
 * Revert file
 *
 **************************************************************************/
module.exports = function(path) {
  if (opened.is(path)) {
    return exec('revert ' + path);
  }
  return false;
};
