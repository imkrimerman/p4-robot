'use strict'
var shell = require('shelljs'),
  str = require('underscore.string');
/***************************************************************************
 *
 * Tests Perforce
 *
 **************************************************************************/
module.exports = function() {
  try {
    var out = shell.exec('p4', {silent: true}).output;
    if (str.contains(out, 'error')) return false;
    return true;
  } catch (e) {
    return false;
  }
};
