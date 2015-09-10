'use strict'

module.exports = function(path) {
  if (this.isChmod(path, 'rw')) {
    return this.exec('revert ' + path);
  }
  return false;
};
