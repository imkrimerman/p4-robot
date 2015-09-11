'use strict'
var _ = require('lodash'),
  val = require('./val'),
  str = require('underscore.string');
/***************************************************************************
 *
 * Destruct array
 *
 **************************************************************************/
module.exports = function destructArray (part, splitter) {
  splitter = val(splitter, ':');
  var destructed = part.split(splitter),
    clean = str.clean,
    key,
    value;

  if (_.isEmpty(destructed)) {
    throw 'Destruct Error in: ' + part + ' with splitter ' + splitter;
  }

  key = destructed[0];
  value = destructed[1];

  if (destructed.length > 2) {
    value += splitter + destructed.slice(2, destructed.length).join(splitter);
  }

  return {
    key: clean(key),
    value: clean(value)
  }
}
