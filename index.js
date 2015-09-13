'use strict'
var val = require('im.val')
  , _ = require('lodash')
  , globalConfig = require('./config')
  , core = require('./core')
  , utils = require('./utils')
  , log = require('./utils/log')
  , EventClass = utils.Classes.EventClass;
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
  constructor: function(config) {
    this.config = _.defaults(val(config, {}, _.isObject), globalConfig);
    this.log = new log(this.config.log);
  }
}));

/**
 * Merges prototype
 * @param {Object} proto
 * @returns {Object}
 */
function Prototype(proto) {
  _.extend(utils, {val: val});
  delete utils.class;
  _.extend(proto, core, {$: utils});
  return proto;
};
