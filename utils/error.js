'use strict'
var log = require('./log')();
/***************************************************************************
 *
 * Error
 *
 **************************************************************************/
/**
 * Log error if p4 not installed or not connected
 */
module.exports = function() {
  var link = log('http://www.perforce.com/downloads/complete_list', null, { styles: 'blue' });
  log.error('You don\'t have Perforce Command Line Tools installed or p4 not connected to server');
  log.warn('Install from: ' + link);
  log.warn('Or execute p4 login to connect.');
};
