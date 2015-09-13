'use strict'
var chalk = require('chalk')
  , val = require('im.val')
  , _ = require('lodash')
  , Class = require('./classes').Class
  , globalConfig = require('../config').log;
/***************************************************************************
 *
 * Logger
 *
 **************************************************************************/
/**
 * Logger constructor
 * @param {Object} config
 * @constructor
 */
module.exports = Class.extend({

  /**
   * Logger levels
   * @type {{debug: string, error: string, warn: string, info: string}}
   */
  levels: {
    debug: '[DEBUG]',
    error: '[ERROR]',
    warn: '[WARNING]',
    info: '[INFO]'
  },

  /**
   * Logger level prefix styles
   * @type {{debug: string[], error: string[], warn: string[], info: string[]}}
   */
  styles: {
    debug: ['green'],
    error: ['red'],
    warn: ['yellow'],
    info: ['blue']
  },

  /**
   * Logger Constructor
   * @param config
   */
  constructor: function Logger (config) {
    if (! _.isObject(config)) {
      config = val(globalConfig, { debug: false });
    }
    this.config = config;
  },

  /**
   * Default Static Logger
   * @param {String} msg
   * @param {*} data
   * @param {{styles: array, level: string}} options
   * @example
   *  var log = require('p4').log();
   *  log('Awesome', { log: 'this' }, { styles: ['blue', 'underline', 'italics'], level: log.info });
   *  log('Awesome', { log: 'this' }, { styles: ['blue', 'underline', 'italics'] });
   *  log('Awesome', { log: 'this' });
   *  log('Awesome');
   */
  default: function(msg, data, options) {
    options = _.defaults(val(options, {}), {styles: [], level: ''});
    this.log(options.level, msg, data, options.styles);
  },

  /**
   * Debug logger
   * @param {String} msg
   * @param {*|undefined} data
   * @param {Array|String|undefined} styles
   * @param {*} data
   */
  debug: function(msg, data, styles) {
    if (! this.config || ! this.config.debug) return;
    this.log(this.levels.debug, msg, data, styles);
  },

  /**
   * Error logger
   * @param {String} msg
   * @param {*|undefined} data
   * @param {Array|String|undefined} styles
   * @param {*} data
   */
  error: function(msg, data, styles) {
    this.log(this.levels.error, msg, data, styles);
  },

  /**
   * Warning logger
   * @param {String} msg
   * @param {*|undefined} data
   * @param {Array|String|undefined} styles
   * @param {*} data
   */
  warn: function(msg, data, styles) {
    this.log(this.levels.warn, msg, data, styles);
  },

  /**
   * Info logger
   * @param {String} msg
   * @param {*|undefined} data
   * @param {Array|String|undefined} styles
   * @param {*} data
   */
  info: function(msg, data, styles) {
    this.log(this.levels.info, msg, data, styles);
  },

  /**
   * Logs level, message and data to console
   * @param {String} level
   * @param {String} msg
   * @param {*} data
   * @param {Array|String} styles
   */
  log: function(level, msg, data, styles) {
    // if we don't have data then set it to an empty string
    if (val(data) === val.notDefined) data = '';
    // if data is object or array then prepare it to log
    if (_.isArray(data) || _.isObject(data)) {
      data = JSON.serialize(data);
    }
    // apply styles for msg
    var msgStyle = this.stylify(styles);
    msg = msgStyle(msg);
    // if we have level specified and it's correct then log it too.
    if (_.isString(level)) {
      if (! _.has(this.levels, level)) {
        var levelStyle = this.stylify(level);
        msg = levelStyle(level + ': ') + msg;
      }
      else {
        level = level.toUpperCase();
        msg = level + ': ' + msg;
      }
    }
    console.log(msg, data);
  },

  /**
   * Set styles to logger
   * @param {*} logger
   * @param {String|Array} styles
   * @returns {*}
   */
  stylify: function(styles) {
    var chalk_ = __chalk()
      , applied = false;
    if (_.isEmpty(styles)) return this.__noop;
    // if is string styles check if we have this style in Logger.prototype.styles,
    // if not then wrap it in Array
    styles = this.getStyle(styles)
    // Apply styles to chalk_
    for (var key in styles) {
      var style = styles[key];
      if (! _.has(chalk.styles, style)) continue;
      applied = true;
      chalk_ = chalk[style];
    }
    return applied ? chalk_ : this.__noop;
  },

  /**
   * If is string styles then check if we have this style in Logger.prototype.styles,
   * if not then wrap it in Array
   * If is object then grab values, otherwise return empty array.
   * @param {String|Array} styles
   * @returns {Array}
   */
  getStyle: function(styles) {
    if (_.isString(styles)) {
      var levels = _.invert(this.levels);
      if (_.has(levels, styles)) {
        styles = levels[styles];
      }
      if (_.has(this.styles, styles)) {
        styles = this.styles[styles];
      }
      else styles = [styles];
    }
    else if (_.isObject(styles)) styles = _.values(styles);
    if (! _.isArray(styles)) return [];
    return styles;
  },

  __noop: function(msg) {
    return msg;
  },
});

/**
 * Returns chalk clone
 * @returns {*}
 * @private
 */
function __chalk () {
  return _.cloneDeep(chalk);
}
