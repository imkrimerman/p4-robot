'use strict'
var val = require('im.val')
  , _ = require('lodash')
  , globalConfig = require('./config')
  , core = require('./core')
  , utils = require('./utils')
  , log = require('./utils/log')
  , EventClass = utils.Classes.EventClass
  , NodeCache = require('node-cache');
/***************************************************************************
 *
 * Perforce
 *
 **************************************************************************/
/**
 * Perforce Robot
 * @param {Object} config
 * @returns {*}
 */
module.exports = EventClass.extend(Prototype({

  /**
   * Constructor
   * @param config
   */
  constructor: function(config) {
    this.config = _.defaults(val(config, {}, _.isObject), globalConfig);
    this.log = new log(this.config.log);

    this.__cache = new NodeCache({
      stdTTL: this.config.cache.life,
      checkperiod: this.config.cache.checkPeriod
    });

    this.$.shell.defaults = {
      exec: this.config.exec,
      shell: this.config.shell
    }
  }
}));

/**
 * Merges prototype
 * @param {Object} proto
 * @returns {Object}
 */
function Prototype(proto) {
  _.extend(utils, {val: val});
  delete utils.Classes;
  _.extend(proto, core, {$: utils});
  return proto;
};
