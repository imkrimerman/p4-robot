'use strict'
var _ = require('lodash'),
  exists = require('./exists'),
  shell = require('shelljs'),
  log = require('../utils/log')(),
  test = require('./test'),
  val = require('../utils/val'),
  error = require('../utils/error');
/***************************************************************************
 *
 * Execute
 *
 **************************************************************************/
/**
 * Execute Perforce command
 * @param {String} cmd
 * @param {Object} options
 * @returns {*}
 */
module.exports = function(cmd, options) {
  options = _.defaults(val(options, {}), this.config.exec);
  // if p4 executable exists and we are connected then execute
  if (exists() && test()) {
    cmd = 'p4 ' + cmd;
    log.debug(cmd);
    return shell.exec(cmd, options);
  }
  // if p4 executable not exists or we got errors while testing p4
  // then log error and help link
  error();
};
