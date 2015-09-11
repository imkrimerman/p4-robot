'use strict'
/***************************************************************************
 *
 * Adds file to Perforce
 *
 **************************************************************************/
module.exports = function(path, changelist) {
  if (! this.isChmod(path, 'r') && ! this.isOpened(path)) {
    var out = this.exec('add -c ' + changelist + ' ' + path);
    this.dirtyUnlock(path);
    return out;
  }
  return this.reopen(path, changelist);
};
