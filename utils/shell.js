'use strict';
var _ = require('lodash')
  , shell = require('shelljs')
  , spawn = require('cross-spawn')
  , val = require('im.val')
  , shellMethods = _.omit(shell, ['exec', 'config'])
  , exec = shell.exec;
/***************************************************************************
 *
 * Shell
 *
 **************************************************************************/
module.exports = _.extend(shellMethods, {

  /**
   * Default Options
   */
  defaults: {
    exec: { sync: true },
    shell: { silent: true, fatal: false }
  },

  /**
   * Execute command
   * @param {String} command
   * @param {boolean|undefined} options
   * @returns {*}
   */
  execute: function(command, options) {
    return this.__execute('shell', command, options);
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
    options = val(options, {}, function(value) { return ! _.isEmpty(value); });
    delete options.sync;
    options = _.defaults(options, this.defaults.shell);
    return exec(command, options);
  }

});
