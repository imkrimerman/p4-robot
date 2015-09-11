'use strict'
var exec = require('./exec'),
  _ = require('lodash'),
  destruct = require('../utils/destruct'),
  str = require('underscore.string'),
  val = require('../utils/val');
/***************************************************************************
 *
 * Returns information about current client
 *
 **************************************************************************/
module.exports = function() {
  var out = prepareOutput(exec('client -o').output),
    client = {};

  for (var key in out) {
    var part = destruct(out[key]);
    client[part.key] = part.value;
  }

  if (_.has(client, 'View')) {
    client.View = split(client.View);
    var View = {};
    for (var key in client.View) {
      var dest = destruct(client.View[key], ' ');
      View[dest.key] = dest.value;
    }
    client.View = View;
  }

  if (_.has(client, 'ChangeView')) client.ChangeView = split(client.ChangeView);
  if (_.has(client, 'Options')) client.Options = split(client.Options, ' ');
  if (_.has(client, 'SubmitOptions')) client.SubmitOptions = split(client.SubmitOptions, ' ');

  return client;
};

/**
 * Splits String
 * @param str
 * @param splitter
 * @returns {Array}
 */
function split(str, splitter) {
  splitter = val(splitter, "\t");
  return str.split(splitter);
}

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
  return normalize(_.compact(out));
}

/**
 * Normalizes lines from output
 * @param out
 * @returns {Array}
 */
function normalize(out) {
  var norm = [];
  for (var key in out) {
    if (str.startsWith(out[key], "\t")) {
      norm[norm.length - 1] += out[key];
    }
    else norm.push(out[key]);
  }
  return norm;
}
