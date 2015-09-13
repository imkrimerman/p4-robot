'use strict'
var _ = require('lodash')
  , val = require('im.val')
  , error = require('../utils/error');
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
  // if p4 executable exists and we are connected then execute
  if (this.exists() && this.test()) {
    var execCmd = 'p4 ' + cmd
      , output = this.$.shell.executer(execCmd, options)
      , event = 'exec:' + cmd;
    this.log.debug(execCmd);
    this.$$fire(event, { cmd: cmd, options: options, output: output });
    return output;
  }
  // if p4 executable not exists or we got errors while testing p4
  // then log error and help link
  return error();
};

