'use strict'
var _ = require('lodash')
  , val = require('im.val')
  , str = require('underscore.string');
/***************************************************************************
 *
 * Destruct
 *
 **************************************************************************/
/**
 * Destructs string to array
 * @param {String} part
 * @param {String} splitter
 * @returns {{key: *, value: *}}
 */
module.exports = function destructArray (part, splitter) {
  // if no splitter then use ':'
  splitter = val(splitter, ':');
  var destructed = part.split(splitter)
    , clean = str.clean
    , key
    , value;

  if (_.isEmpty(destructed)) {
    throw 'Destruct Error in: ' + part + ' with splitter ' + splitter;
  }
  // grab key and value
  key = destructed[0];
  value = destructed[1];
  // if we have more then two parts in array,
  // then join left parts by provided splitter and attach them to value
  if (destructed.length > 2) {
    value += splitter + destructed.slice(2, destructed.length).join(splitter);
  }
  // return clean object with key and value
  return {
    key: clean(key),
    value: clean(value)
  }
}
