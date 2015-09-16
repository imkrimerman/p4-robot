'use strict'
var val = require('im.val')
  , _ = require('lodash')
  , globalConfig = require('./config')
  , core = require('./core')
  , utils = require('./utils')
  , log = require('./utils/log')
  , EventEmitterClass = utils.Classes.EventEmitterClass
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
module.exports = EventEmitterClass.extend(Prototype({

  /**
   * Constructor
   * @param config
   */
  constructor: function(config) {
    this.config = _.defaults(val(config, {}, _.isObject), globalConfig);
    this.log = new log(this.config.log);

    this.__cache = new NodeCache({
      stdTTL: this.config.cache.life,
      checkperiod: 0
    });

    this.$.shell.defaults = {
      exec: this.config.exec,
      shell: this.config.shell
    }
  },

  /**
   * Create event with provided arguments
   * @returns {Function.apply|*|apply}
   */
  event: function() {
    return new EventClass.apply(EventClass, arguments)
  }

}));

/**
 * Merges prototype
 * @param {Object} proto
 * @returns {Object}
 */
function Prototype(proto) {
  var $ = _.extend({}, utils, {val: val});
  delete $.Classes;
  _.extend(proto, core, {$: $});
  return proto;
};
