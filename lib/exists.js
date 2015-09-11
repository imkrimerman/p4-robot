'use strict'
var which = require('shelljs').which,
  config = require('../config');
/***************************************************************************
 *
 * Checks if Perforce Command Line Tools exists
 *
 **************************************************************************/
module.exports = function() {
  return !! which(config.paths.p4);
};
