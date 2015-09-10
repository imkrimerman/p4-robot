'use strict';
var _ = require('lodash'),
  shell = require('shelljs'),
  spawn = require('cross-spawn'),
  val = require('./val'),
  shellMethods = _.omit(shell, ['exec', 'popd', 'pushd']),
  exec = shell.exec;
/***************************************************************************
 *
 * Shell
 *
 **************************************************************************/
module.exports = _.extend(shellMethods, {

  /**
   * Execute command sync
   * @param {String} command
   * @param {boolean|undefined} options
   * @returns {*}
   */
  execute: function(command, options) {
    return this._execute('shell', command, options);
  },

  /**
   * Execute command with spawn module
   * @param {String} command
   * @param {Object|undefined} options
   * @returns {*}
   */
  spawnSync: function(command, options) {
    return this._execute('spawn', command, options);
  },

  /**
   * Execute command async
   * @param {String} command
   * @param {Object|undefined} options
   * @returns {*}
   */
  spawn: function(command, options) {
    options = _.extend(val(options, {}), { sync: false });
    return this._execute('spawn', command, options);
  },

  /**
   * Execute command
   * @param {String} method
   * @param {String} command
   * @param {Object|undefined} options
   * @returns {*}
   * @private
   */
  _execute: function(method, command, options) {
    options = _.defaults(val(options, {}), { sync: true });
    if (method === 'spawn') {
      options = _.defaults(options, { stdio: 'inherit' });
      command = this._execToSpawnCmd(command);
      if (options.sync) {
        delete options.sync;
        spawn = spawn.sync;
      }
      return spawn(command.cmd, command.args, options)
    }
    delete options.sync;
    return exec(command, options);
  },

  /**
   * Converts string command to spawn command arguments
   * @param {String} command
   * @returns {Object}
   * @private
   */
  _execToSpawnCmd: function(command) {
    command = command.split(' ');
    return {
      cmd: command.shift(),
      args: command
    };
  },

});
