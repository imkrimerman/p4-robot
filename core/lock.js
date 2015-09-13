'use strict'
var val = require('im.val');
/***************************************************************************
 *
 * Lock
 *
 **************************************************************************/
/**
 * Lock an opened file against changelist submission.
 * @param path
 * @param changelist
 */
module.exports = function(path, changelist) {
  if (path && ! this.opened.is(path)) {
    this.log.warn('Can\'t lock not opened file: ' + path);
    return;
  }
  var cmd = 'lock';
  if (path) cmd += ' ' + path;
  if (changelist) cmd += ' -c ' + changelist;
  this.$$fire('lock', {path: path, changelist: changelist});
  this.exec(cmd);
};
