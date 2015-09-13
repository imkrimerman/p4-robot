'use strict'
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
    return this.config.modes[stat.mode] === chmod;
  }
  return false;
};

