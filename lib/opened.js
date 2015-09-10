'use strict'

module.exports = function() {
  var opened = this.exec('opened', true).output.split("\n");
  if (_.isEmpty(opened)) return opened;
  for (var key in opened) {
    opened[key] = opened[key].split('#')[0];
  }
  return opened;
};
