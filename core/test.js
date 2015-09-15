'use strict'
var str = require('underscore.string')
  , val = require('im.val')
  , _ = require('lodash');
/***************************************************************************
 *
 * Test
 *
 **************************************************************************/
/**
 * Tests Perforce for errors
 * @params {Object} options
 * @returns {boolean}
 */
module.exports = function(options) {
  options = _.defaults(val(options, {}, _.isObject), {checkLogin: true});
  var strOptions = options.checkLogin ? 'true' : 'false'
    , cachedKey = 'test:' + strOptions
    , cached = this.__cache.get(cachedKey)
    , isCached = !! cached && this.config.cache.state
    , conf = { silent: true }
    , baseTest
    , isLoggedIn = 'ok'
    , result;

  try {
    if (isCached) {
      this.log.debug('Taking [test] from cache...');
      return cached;
    }

    baseTest = this.$.shell.execute('p4', conf).output;
    if (options.checkLogin) {
      isLoggedIn = this.$.shell.execute('p4 login -s', conf).output;
    }

    if (
      str.contains(baseTest, 'error') ||
      str.contains(isLoggedIn, 'invalid or unset')
    ) result = false;
    else result = true;
  }
  catch (e) {
    result = false;
  }
  if (! isCached) this.__cache.set(cachedKey, result);
  return result;
};
