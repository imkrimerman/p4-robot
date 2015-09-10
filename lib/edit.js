'use strict'

module.exports = function(path, changelist) {
  if (this.isChmod(path, 'r') && ! this.isOpened(path)) {
    return this.exec('edit -c ' + changelist + ' ' + path);
  }
  return this.reopen(path, changelist);
};
