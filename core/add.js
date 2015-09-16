'use strict'
var val = require('im.val')
  , Event = require('../utils/event');
/***************************************************************************
 *
 * Opens file in add mode
 *
 **************************************************************************/
/**
 * Opens file in add mode
 * @param {String} path
 * @param {String} changelist
 * @param {Object} execOptions
 * @returns {Object|boolean}
 */
module.exports = function(path, changelist, execOptions) {
  // open file in add mode only if it's not opened yet
  if (! this.opened(path)) {
    changelist = val(changelist, this.config.defaultChangelist);
    var event = new Event('add', {
        command: 'add',
        options: '-c ' + changelist + ' ' + path,
        execOptions: execOptions,
        data: { path: path, changelist: changelist }
      });
    return this.$exec(event);
  }
  return false;
};
