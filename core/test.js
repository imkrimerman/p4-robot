'use strict'
var str = require('underscore.string');
/***************************************************************************
 *
 * Test
 *
 **************************************************************************/
/**
 * Tests Perforce for errors
 * @returns {boolean}
 */
module.exports = function() {
  try {
    var out = this.$.shell.execute('p4', { silent: true }).output;
    if (str.contains(out, 'error')) return false;
    return true;
  }
  catch (e) {
    return false;
  }
};
