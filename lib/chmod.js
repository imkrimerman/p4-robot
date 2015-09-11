'use strict'
var modes = require('../config').modes;
/***************************************************************************
 *
 * Compares file mode with provided mode
 *
 **************************************************************************/
module.exports = function(path, chmod) {
  if (! fs.existsSync(path)) return false;
  var stat = fs.statSync(path);
  if (stat && stat.mode) {
    return modes[stat.mode] === chmod;
  }
  return false;
};

