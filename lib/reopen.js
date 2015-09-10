'use strict'

module.exports = function(path, changelist) {
  if (this.isOpened(path)) {
    this.exec('reopen -c ' + changelist + ' ' + path);
    return true;
  }
  return false;
};
