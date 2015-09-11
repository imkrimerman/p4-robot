'use strict'
var exec = require('./exec'),
  log = require('../utils/log');
//  require('epipebomb')();
/***************************************************************************
 *
 * Logs in Perforce
 *
 **************************************************************************/
module.exports = function(password) {
  var child = exec('login', {async: true});

  child.stdout.on('error', function(err) {
    log.error(err);
  });

  child.stdout.on('data', function() {
    log.info('Logging in...');
    child.stdin.setEncoding('utf-8');
    child.stdin.write(password + "\n");
  })
};
