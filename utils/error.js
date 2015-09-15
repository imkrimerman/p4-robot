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
  log.error('Error, possible issues:');
  log.error('1. You don\'t have Perforce Command Line Tools installed');
  log.error('2. Perfoce not connected to the server');
  log.info('Install from: ' + link + " or fix connection to Perforce server.");
  throw 'Execution error.'
};
