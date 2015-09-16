'use strict'
/***************************************************************************
 *
 * Logout
 *
 **************************************************************************/
/**
 * Logs out from Perforce
 * @returns {*}
 */
module.exports = function() {
  var out = this.$exec(this.event('logout'));
  this.__cache.del('test:true');
  return out;
};
