'use strict'
var fs = require('fs'),
  config = require('../config');

module.exports = function() {
  return fs.existsSync(config.paths.p4)
};
