'use strict'
var chalk = require('chalk'),
  config = require('../config');
/***************************************************************************
 *
 * Logger
 *
 **************************************************************************/
var Log = module.exports = function(msg, styles) {
  var logger = chalk;
  for (var key in styles) logger = chalk[styles[key]];
  console.log(logger(msg));
};

Log.debug = function(msg, data) {
  if (! config.log.debug) return;
  console.log(chalk.underline.blue('[DEBUG]:'), msg);
  if (data) {
    if (_.isArray(data) || _.isObject(data)) {
      data = JSON.serialize(data);
    }
    console.log(data);
  }
};

Log.error = function(msg) {
  Log(msg, ['red']);
};

Log.warn = function(msg) {
  Log(msg, ['yellow']);
};

Log.info = function(msg) {
  Log(msg, ['blue']);
};
