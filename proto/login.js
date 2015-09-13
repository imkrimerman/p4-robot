'use strict'
var exec = require('./exec'),
  log = require('../utils/log')();
require('epipebomb')();
/***************************************************************************
 *
 * Login
 *
 **************************************************************************/
/**
 * Logs in Perforce
 * @param {String} password
 */
module.exports = function(password) {
  // execute command async and get process child
  var child = exec('login', { async: true });
  // set error handler
  child.stdout.on('error', function(err) {
    log.warn('Whoops, something went wrong...');
    log.error(err.message);
  });
  // on password question send password
  child.stdout.on('data', function() {
    log.info('Logging in...');
    child.stdin.setEncoding('utf-8');
    child.stdin.write(password + "\n");
  })
};
