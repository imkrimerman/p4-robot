'use strict'
var chalk = require('chalk'),
  val = require('./val'),
  globalConfig = require('../index').config;
/***************************************************************************
 *
 * Logger
 *
 **************************************************************************/
/**
 * Logger factory.
 * @param config
 * @returns {Function}
 */
module.exports = function(config) {
  if (val(config) === val.notDefined || ! _.isObject(config)) {
    config = val(globalConfig, { debug: false });
  }
  return new Logger(config);
};

/**
 * Logger constructor
 * @param {Object} config
 * @constructor
 */
function Logger (config) {
  this.config = config;
}

/**
 * Export logger as is to factory
 * @type {Function}
 */
module.exports.logger = Logger;

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
Logger.default = function(msg, data, options) {
  // set default options
  options = _.defaults(val(options, {}), {
    styles: [],
    level: ''
  });
  log(options.level, msg, data, options.styles);
};

/**
 * Debug logger
 * @param {String} msg
 * @param {*|undefined} data
 * @param {Array|String|undefined} styles
 * @param {*} data
 */
Logger.prototype.debug = function(msg, data, styles) {
  if (! this.config || ! this.config.debug) return;
  log(this.levels.debug, msg, data, styles);
};

/**
 * Error logger
 * @param {String} msg
 * @param {*|undefined} data
 * @param {Array|String|undefined} styles
 * @param {*} data
 */
Logger.prototype.error = function(msg, data, styles) {
  log(this.levels.error, msg, data, styles);
};

/**
 * Warning logger
 * @param {String} msg
 * @param {*|undefined} data
 * @param {Array|String|undefined} styles
 * @param {*} data
 */
Logger.prototype.warn = function(msg, data, styles) {
  log(this.levels.warn, msg, data, styles);
};

/**
 * Info logger
 * @param {String} msg
 * @param {*|undefined} data
 * @param {Array|String|undefined} styles
 * @param {*} data
 */
Logger.prototype.info = function(msg, data, styles) {
  log(this.levels.info, msg, data, styles);
};

/**
 * Logger levels
 * @type {{debug: string, error: string, warn: string, info: string}}
 */
Logger.prototype.levels = {
  debug: '[DEBUG]',
  error: '[ERROR]',
  warn: '[WARNING]',
  info: '[INFO]'
};

/**
 * Logger level prefix styles
 * @type {{debug: string[], error: string[], warn: string[], info: string[]}}
 */
Logger.prototype.styles = {
  debug: ['green'],
  error: ['red'],
  warn: ['yellow'],
  info: ['blue']
};

/**
 * Logs level, message and data to console
 * @param {String} level
 * @param {String} msg
 * @param {*} data
 * @param {Array|String} styles
 */
function log (level, msg, data, styles) {
  // if we don't have data then set it to an empty string
  if (val(data) === val.notDefined) data = '';
  // if data is object or array then prepare it to log
  if (_.isArray(data) || _.isObject(data)) {
    data = JSON.serialize(data);
  }
  // apply styles for msg
  var msgStyle = stylify(styles);
  msg = msgStyle(msg);
  // if we have level specified and it's correct then log it too.
  if (_.isString(level)) {
    if (! _.has(Logger.prototype.levels, level)) {
      var levelStyle = stylify(level);
      msg = levelStyle(level + ': ') + msg;
    }
    else {
      level = level.toUpperCase();
      msg = level + ': ' + msg;
    }
  }
  console.log(msg, data);
}

/**
 * Hook log functions to Logger Statics
 */
Logger.log = log;

/**
 * Set styles to logger
 * @param {*} logger
 * @param {String|Array} styles
 * @returns {*}
 */
function stylify (styles) {
  var logger = __chalk();
  if (_.isEmpty(styles)) return logger;
  // if is string styles check if we have this style in Logger.prototype.styles,
  // if not then wrap it in Array
  styles = getStyle(styles)
  // Apply styles to logger
  for (var key in styles) {
    var style = styles[key];
    if (! _.has(chalk, style)) continue;
    logger = chalk[style];
  }
  return logger;
}

/**
 * Hook stylify functions to Logger Statics
 */
Logger.stylify = stylify;

/**
 * If is string styles then check if we have this style in Logger.prototype.styles,
 * if not then wrap it in Array
 * If is object then grab values, otherwise return empty array.
 * @param {String|Array} styles
 * @returns {Array}
 */
function getStyle (styles) {
  if (_.isString(styles)) {
    if (_.has(Logger.prototype.styles, styles)) {
      styles = Logger.prototype.levels[styles];
    }
    else styles = [styles];
  }
  else if (_.isObject(styles)) styles = _.values(styles);
  if (! _.isArray(styles)) return [];
  return styles;
};

/**
 * Hook getStyle functions to Logger Statics
 */
Logger.getStyle = getStyle;

/**
 * Returns chalk clone
 * @returns {*}
 * @private
 */
function __chalk () {
  return _.clone(chalk);
}
