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
module.exports = function(password, suppressLog) {
  suppressLog = val(suppressLog, false);
  // execute command async and get process child
  var child = this.exec('login', { executor: 'shell', async: true, silent: true })
    , self = this;
  if (! child) return;
  setErrorHandlers(this, child, suppressLog);
  // on password question send password
  child.stdout.on('data', function (data) {
    if (! suppressLog) {
      if (str.contains(data, 'password')) {
        self.log.info('Logging in...');
      }
      else self.log.info(str.clean(data));
    }
    child.stdin.setEncoding('utf-8');
    child.stdin.write(password + "\n");
    self.$$fire('login');
  });
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
