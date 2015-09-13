'use strict'
var Logger = require('./log')
  , log = new Logger({debug: false})
  , chalk = require('chalk');
/***************************************************************************
 *
 * Error
 *
 **************************************************************************/
/**
 * Log error if p4 not installed or not connected
 * @returns {boolean}
 */
module.exports = function() {
  var link = chalk.blue('http://www.perforce.com/downloads/complete_list');
  log.error('You don\'t have Perforce Command Line Tools installed or p4 not connected to server');
  log.warn('Install from: ' + link + " or execute p4 login to connect.");
  return false;
};
