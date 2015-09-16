'use strict'
var val = require('im.val')
  , str = require('underscore.string')
  , _ = require('lodash');
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
module.exports = function(password, cb, suppressLog) {
  cb = val(cb, _.noop, _.isFunction);
  suppressLog = val(suppressLog, false);
  if (_.isObject(password)) return login(this, password);
  // execute command async and get process child
  var child = this.exec('login', { async: true, silent: true }, { checkLogin: false })
    , dataTriggered = 0
    , self = this;
  if (! child) return;
  setErrorHandlers(this, child, suppressLog);
  // set callback on login event
  this.$after('login', cb);
  // on password question send password
  child.stdout.on('data', function (data) {
    if (! suppressLog) self.log.info('Logging in...');
    if (++dataTriggered) {
      child.stdin.setEncoding('utf-8');
      child.stdin.write(password + "\n");
      self.$fire(this.event('logging', { output: data }));
    }
    if (dataTriggered > 1 && ! suppressLog) {
      self.log.info(data);
      self.$fire(this.event('login', {
        command: 'login',
        output: data
      }));
    }
  });
};

/**
 * Execute login with options
 * @param self
 * @param options
 * @returns {*|{sync}|Array|{index: number, input: string}}
 */
function login (self, options) {
  var out = self.exec('login' + optionsToCmd(options));
  self.$fire('login', {self: self, options: options, output: out});
  return out;
};

/**
 * Convert options Object to string
 * @param {Object} options
 * @returns {*}
 */
function optionsToCmd (options) {
  if (! _.isObject(options)) return '';
  var cmd = [];
  for (var key in options) {
    if (key === 'all') cmd.push('-a');
    if (key === 'host') cmd.push('-h ' + options[key]);
    if (key === 'display') cmd.push('-p');
    if (key === 'status') cmd.push('-s');
  }
  if (_.isEmpty(cmd)) return '';
  return ' ' + cmd.join(' ');
};

/**
 * Sets IO error handlers
 * @param self
 * @param child
 * @param suppressLog
 */
function setErrorHandlers (self, child, suppressLog) {
  _.each(['stdin', 'stdout'], function(io) {
    require('epipebomb')(child[io], process.exit);
    child[io].on('error', onError(self, io, suppressLog));
  });
}

/**
 * IO error handler
 * @param self
 * @param process
 * @param io
 * @param suppressLog
 * @returns {Function}
 */
function onError (self, io, suppressLog) {
  return function(err) {
    if (! suppressLog) {
      self.log.warn(str.capitalize(io) + ': Whoops, something went wrong...');
      self.log.error(err.message);
    }
  }
}
