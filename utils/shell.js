'use strict';
var _ = require('lodash')
  , shell = require('shelljs')
  , spawn = require('cross-spawn')
  , val = require('im.val')
  , shellMethods = _.omit(shell, ['exec'])
  , exec = shell.exec;
/***************************************************************************
 *
 * Shell
 *
 **************************************************************************/
module.exports = _.extend(shellMethods, {

  /**
   * Available executers
   */
  executers: ['shell', 'spawn'],

  /**
   * Returns executor by options
   * @param {String} cmd
   * @param {Object} options
   * @returns {*}
   */
  executor: function(cmd, options) {
    var executor;
    if (options.executor) {
      if (! _.contains(this.executers, options.executor)) {
        throw 'Unknown executor: ' + options.executor;
      }
      executor = options.executor;
    }
    else if (options.async) executor = 'spawn';
    else if (options.sync) executor = 'shell';
    else executor = this.executor(cmd, this.config.exec);
    // exec command with options
    return this.__execute(executor, cmd, options);
  },

  /**
   * Execute command sync
   * @param {String} command
   * @param {boolean|undefined} options
   * @returns {*}
   */
  execute: function(command, options) {
    return this.__execute('shell', command, options);
  },

  /**
   * Execute command with spawn module
   * @param {String} command
   * @param {Object|undefined} options
   * @returns {*}
   */
  spawnSync: function(command, options) {
    return this.__execute('spawn', command, options);
  },

  /**
   * Execute command async
   * @param {String} command
   * @param {Object|undefined} options
   * @returns {*}
   */
  spawn: function(command, options) {
    options = _.extend(val(options, {}), { sync: false });
    return this.__execute('spawn', command, options);
  },

  /**
   * Execute command
   * @param {String} method
   * @param {String} command
   * @param {Object} options
   * @returns {*}
   * @private
   */
  __execute: function(method, command, options) {
    if (method === 'spawn') {
      options = _.defaults(options, { stdio: 'inherit' });
      command = this._execToSpawnCmd(command);
      if (options.sync) spawn = spawn.sync;
      delete options.sync;
      delete options.async;
      return spawn(command.cmd, command.args, options);
    }
    delete options.sync;
    options = _.defaults(val(options, {}), this.config);
    return exec(command, options);
  },

  /**
   * Converts string command to spawn command arguments
   * @param {String} command
   * @returns {Object}
   * @private
   */
  _execToSpawnCmd: function(command) {
    var split = command.split(' ');
    if (! split.length) {
      throw 'Can\'t convert command:' + command + ' to spawn command format';
    }
    return {
      cmd: split.shift(),
      args: split
    };
  },
});
