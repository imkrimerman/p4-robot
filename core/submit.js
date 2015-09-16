'use strict'
/***************************************************************************
 *
 * Submit
 *
 **************************************************************************/
/**
 * Submit changes to depot
 * @param {Object} options
 * @param {Object} execOptions
 * @returns {}
 */
module.exports = function(options, execOptions) {
  options = optionsToCommand(options);
  return this.$exec('submit' + options, execOptions, 'submit', { options: options });
};


/**
 * Returns converted options to string
 * @param {Object} options
 * @returns {String}
 */
function optionsToCommand (options) {
  if (_.isEmpty(options)) return '';
  var cmd = [];
  for (var key in options) {
    if (key === 'path') cmd.push(options[key]);
    if (key === 'force') cmd.push('-f');
    if (key === 'keep') cmd.push('-k');
    if (key === 'list') cmd.push('-L');
    if (key === 'display') cmd.push('-n');
    if (key === 'net') cmd.push('-N');
    if (key === 'populate') cmd.push('-p');
    if (key === 'quite') cmd.push('-q');
    if (key === 'safe') cmd.push('-s');
    if (key === 'parallel') {
      var parallel = [];
      for (var pKey in options[key]) {
        var pVal = options[key]
          , available = ['threads', 'batch', 'batchsize', 'min', 'minsize'];
        if (_.contains(available, pKey)) {
          parallel.push(pKey + '=' + pVal);
        }
      }
      if (! _.isEmpty(parallel)) {
        cmd.push('--parallel');
        cmd.concat(parallel);
      }
    }
    return ' ' + cmd.join(' ');
  }
}

