'use strict'
var _ = require('lodash'),
  exists = require('./exists'),
  shell = require('shelljs'),
  log = require('../utils/log'),
  test = require('./test'),
  config = require('../config'),
  val = require('../utils/val');
/***************************************************************************
 *
 * Execute Perforce command
 *
 **************************************************************************/
module.exports = function(cmd, options) {
  options = _.defaults(val(options, {}), config.output);
  if (exists() && test()) {
    cmd = config.p4 + ' ' + cmd;
    log.debug(cmd);
    return shell.exec(cmd, options);
  }

  log.error('You don\'t have Perforce Command Line Tools');
  console.log('Install from: ', log('http://www.perforce.com/downloads/complete_list', [
    'underline',
    'blue'
  ]));
};
