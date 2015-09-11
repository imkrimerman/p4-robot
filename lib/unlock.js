'use strict'
var shell = require('../utils/shell'),
  nodePath = require('path');

module.exports = function() {};

module.exports.dirty = function(path) {
  shell.chmod('u+w ' + nodePath.join(process.cwd(), path));
}
