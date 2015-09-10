'use strict'
var shell = require('../utils/shell'),
  path = require('path');

module.exports = function() {};

module.exports.dirty = function(_path) {
  shell.execute('chmod u+w ' + path.join(process.cwd(), _path));
}
