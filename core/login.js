'use strict'
var val = require('im.val');
require('epipebomb')();
/***************************************************************************
 *
 * Login
 *
 **************************************************************************/
/**
 * Logs in Perforce
 * @param {String} password
 * @param {boolean} suppressLog
 */
module.exports = function(password, suppressLog) {
  suppressLog = val(suppressLog, false);
  var self = this;
  // execute command async and get process child
  var child = this.exec('login', { async: true, executer: 'shell' });
  // set error handler
  child.stdout.on('error', function(err) {
    if (! suppressLog) {
      self.log.warn('Whoops, something went wrong...');
      self.log.error(err.message);
    }
  });
  // on password question send password
  child.stdout.on('data', function() {
    if (! suppressLog) {
      self.log.info('Logging in...');
    }
    child.stdin.setEncoding('utf-8');
    child.stdin.write(password + "\n");
    self.$$fire('login');
  });
};
