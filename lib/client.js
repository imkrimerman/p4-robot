'use strict'
var exec = require('./exec'),
  _ = require('lodash'),
  destruct = require('../utils/destruct'),
  str = require('underscore.string');
/***************************************************************************
 *
 * Returns information about current client
 *
 **************************************************************************/
module.exports = function() {
  var out = prepareOutput(exec('client -o').output),
    client = Object.create(null);

  for (var key in out) {
    var part = destruct(out[key]);
    client[part.key] = part.value;
  }
  return client;
};

/**
 * Prepares output
 * Removes info from p4 client -o command
 * @param out
 * @returns {*}
 */
function prepareOutput(out) {
  out = _.compact(out.split("\n"));
  for (var key in out) {
    if (str.startsWith(out[key], '#')) delete out[key];
  }
  return out;
}
