'use strict'
var _ = require('lodash');
/***************************************************************************
 *
 * Sync
 *
 **************************************************************************/
/**
 * Syncs workspace
 * @param {Object} options - Object can have any of this keys specified. If option don't need value then set it to true.
 *                  path - File or path to sync
 *                  force - (-f) Force the sync. Perforce performs the sync even if the client workspace
 *                          already has the file at the specified revision. If the file is writable, it is overwritten.
 *                          This option does not affect open files, but it does override the noclobber client option.
 *                  keep - (-k) Keep existing workspace files; update the have list without updating the client
 *                         workspace. Use p4 sync -k only when you need to update the have list to match the actual
 *                         state of the client workspace. p4 sync -k is an alias for the p4 flush.
 *                  list - (-L) For scripting purposes, perform the sync on a list of valid file arguments in full depot
 *                          syntax with a valid revision number.
 *                  display - (-n) Display the results of the sync without actually performing the sync.
 *                             This lets you make sure that the sync does what you think it does before you do it.
 *                  net - (-N) Display a summary of the expected network traffic associated with a sync, without
 *                        performing the sync.
 *                  populate - (-p) Populate a client workspace, but do not update the have list. Any file that
 *                              is already synced or opened is bypassed with a warning message. This option is typically
 *                              used for workspaces used in processes.
 *                  quite - (-q)  Quiet operation: suppress normal output messages.
 *                  safe - (-s) Safe sync: Compare the content in your client workspace against what was last synced.
 *                  parallel - (--parallel) Specify options for parallel file transfer.
 *                              The configuration variable net.parallel.max must be set to a value greater than 1 to
 *                              enable the --parallel option.
 *                              threads=n sends files concurrently using n independent network connections.
 *                                        The specified threads grab work in batches.
 *                              batch=n - specifies the number of files in a batch.
 *                              batchsize=n - specifies the number of bytes in a batch.
 *                              min=n - specifies the minimum number of files in a parallel sync. A sync that is too small
 *                                    will not initiate parallel file transfers.
 *                              minsize=n - specifies the minimum number of bytes in a parallel sync.
 *                                          A sync that is too small will not initiate parallel file transfers.
 *
 * @param {Object} execOptions - Options passed to execute
 * @returns {Object}
 */
module.exports = function(options, execOptions) {
  return this.$exec(this.event('sync', {
    command: 'sync' + optionsToCommand(options),
    options: execOptions,
    data: {options: options}
  }));
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
};
