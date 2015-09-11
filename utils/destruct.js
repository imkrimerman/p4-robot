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
  part = part.split(splitter);
  return {
    key: clean(part[0]),
    value: clean(part[1])
  }
}

function clean(value) {
  return str.clean(value).replace("\n", '').replace("\t", '');
}

