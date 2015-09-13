'use strict'
var exec = require('./exec'),
  _ = require('lodash'),
  destruct = require('../utils/destruct'),
  str = require('underscore.string'),
  val = require('../utils/val');
/***************************************************************************
 *
 * Client
 *
 **************************************************************************/
/**
 * Returns information about current client
 * @param {boolean} viewsAsObject - whether create object from Views or leave them as Array.
 *                                  If you have long path, they can be cut by JS, to prevent this
 *                                  set to false. By default is set to true.
 * @returns {Object}
 */
module.exports = function(viewsAsObject) {
  viewsAsObject = val(viewsAsObject, true);
  // execute client command and prepare output
  var out = prepareOutput(exec('client -o').output),
    client = {};
  // destruct each key in output and set to client
  for (var key in out) {
    var part = destruct(out[key]);
    client[part.key] = part.value;
  }
  // format client Views if has any
  if (_.has(client, 'View')) {
    // split views
    client.View = split(client.View);
    // if viewsAsObject is true then we will make object,
    // where key is depot path and value is local mapped path,
    // otherwise Views will be Array with mapped paths
    if (viewsAsObject) {
      var View = {};
      for (var key in client.View) {
        var dest = destruct(client.View[key], ' ');
        View[dest.key] = dest.value;
      }
      client.View = View;
    }
  }
  // format other
  if (_.has(client, 'ChangeView')) client.ChangeView = split(client.ChangeView);
  if (_.has(client, 'Options')) client.Options = split(client.Options, ' ');
  if (_.has(client, 'SubmitOptions')) client.SubmitOptions = split(client.SubmitOptions, ' ');

  return client;
};

/**
 * Splits String
 * @param {String} str
 * @param {String|undefined} splitter - defaults to \t
 * @returns {Array}
 */
function split (str, splitter) {
  splitter = val(splitter, "\t");
  return str.split(splitter);
}

/**
 * Prepares output
 * Removes info from p4 client -o command
 * @param {String} output
 * @returns {Array}
 */
function prepareOutput (output) {
  output = _.compact(output.split("\n"));
  for (var key in output) {
    if (str.startsWith(output[key], '#')) delete output[key];
  }
  return normalize(_.compact(output));
}

/**
 * Normalizes lines from output
 * @param {Array} output
 * @returns {Array}
 */
function normalize (output) {
  var norm = [];
  for (var key in output) {
    if (str.startsWith(output[key], "\t")) {
      norm[norm.length - 1] += output[key];
    }
    else norm.push(output[key]);
  }
  return norm;
}
