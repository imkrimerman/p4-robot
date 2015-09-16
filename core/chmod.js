'use strict'
var fs = require('fs');
/***************************************************************************
 *
 * Compares file mode with provided mode
 *
 **************************************************************************/
/**
 * Checks file permissions mode
 * @param {String} path
 * @param {String} chmod - 'r' or 'rw'
 * @returns {boolean}
 */
module.exports = function(path, chmod) {
  if (! fs.existsSync(path)) return false;
  var stat = fs.statSync(path);
  if (stat && stat.mode) {
    var result = this.config.modes[stat.mode] === chmod;
    this.$$fire('chmod', { path: path, chmod: chmod, result: result });
    return result;
  }
  return false;
};

