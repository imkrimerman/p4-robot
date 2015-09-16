'use strict'
var val = require('im.val');
/***************************************************************************
 *
 * Lock
 *
 **************************************************************************/
/**
 * Lock an opened file against changelist submission.
 * @param {String} path
 * @param {String} changelist
 * @param {Object} execOptions
 * @returns {Object|ChildProcess}
 */
module.exports = function(options, execOptions) {
  if (! _.has(options, 'path')) {
    this.log.warn('Path is not specified to [p4 lock]');
    return;
  }
  if (! this.opened(options.path)) {
    this.log.warn('Can\'t lock not opened file: ' + path);
    return;
  }
  return this.$exec(this.event('lock', {
    command: 'lock' + optionsToCmd(options),
    options: execOptions,
    data: { options: options }
  }));
};

/**
 * Returns options converted to string
 * @param {Object} options
 * @returns {*}
 */
function optionsToCmd (options) {
  var cmd = [];
  if (_.has(options, 'path')) cmd.push(options.path);
  if (_.has(options, 'changelist')) cmd.push('-c ' + options.changelist);
  if (_.isEmpty(cmd)) return '';
  return ' ' + cmd.join(' ');
};
