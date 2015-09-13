'use strict'
var val = require('im.val')
  , _ = require('lodash')
  , str = require('underscore.string')
  , nodePath = require('path');
/***************************************************************************
 *
 * Opened
 *
 **************************************************************************/
/**
 * Returns opened files with depot paths
 * @param {Object} options
 * @returns {Array}
 */
module.exports = function(options) {
  var cmdOptions = optionsToCommand(val(options, {}))
    , out = prepareOutput(this.exec('opened' + cmdOptions).output)
    , opened = [];

  if (_.isEmpty(out)) return opened;

  for (var key in out) {
    var isShort = _.has(options, 'short') ? options.short : false;
    opened.push(meta(out[key], isShort));
  }
  this.$$fire('opened', {opened: opened, options: options});
  return opened;
};

/**
 * Returns opened files with local paths
 * @param {Object} options
 * @returns {*}
 */
module.exports.local = function(options) {
  var opened = module.exports(options)
    , client = require('./client')()
    , root = client.Root;

  for (var key in opened) {
    for (var viewKey in client.View) {
      var path = opened[key].path,
        depotView = viewKey.replace('/...', '');

      if (str.startsWith(path, depotView)) {
        var view = _.compact(client.View[viewKey].replace('/...', '').split('/'));
        delete view[0];
        view = '/' + _.compact(root.split('/').concat(view)).join('/');
        opened[key].path = path.replace(depotView, view);
      }
    }
  }
  this.$$fire('opened', {opened: opened, options: options});
  return opened;
}

/**
 * Check if file is opened
 * @param {String} path
 * @param {boolean|undefined} isLocal
 * @returns {boolean}
 */
module.exports.is = function(path, isLocal) {
  path = nodePath.isAbsolute(path) ? path : nodePath.join(process.cwd(), path);
  isLocal = val(isLocal, true);
  var opened = isLocal ? module.exports.local() : module.exports()
    , isOpened = _.findWhere(opened, { path: path });
  return _.isUndefined(isOpened) ? false : true;
};

/**
 * Retrieves meta data from opened file
 * @param {String} data
 * @param {boolean} isShort
 * @returns {*}
 */
function meta (data, isShort) {
  if (isShort) return metaShort(data);
  data = this.destruct(data, '#');
  var path = data.key
    , revision = data.value[0]
    , meta = data.value.replace(revision + ' - ', '');
  // get meta data
  meta = splitMeta(meta);
  return {
    path: path,
    revision: revision,
    mode: meta.mode,
    changelist: meta.changelist,
    type: meta.type
  }
}

/**
 * Retrieves short meta data from opened file
 * @param {String} data
 * @returns {Object}
 */
function metaShort (data) {
  data = this.destruct(data, ' - ');
  var path = data.key
    , meta = splitMeta(data.value);

  return {
    path: path,
    mode: meta.mode,
    changelist: meta.changelist
  }
}

/**
 * Splits meta data
 * @param {String} meta
 * @returns {{mode: *, type: *, changelist: *}}
 */
function splitMeta (meta) {
  meta = meta.split(' ');
  var mode = _.first(meta)
    , type = _.last(meta)
    , changelist;

  if (meta[1] === 'change') changelist = meta[2];
  else changelist = meta[1];

  return {
    mode: mode,
    type: type,
    changelist: changelist
  };
}

/**
 * Prepares output for processing
 * @param {String} output
 * @returns {Array}
 */
function prepareOutput (output) {
  return _.compact(output.split("\n"));
}

/**
 * Converts object of options into options string
 * @param {Object} options - all - List opened files in all client workspaces.
 *                                 In distributed environments, this option lists only those files opened
 *                                 in other workspaces on your edge server;
 *                                 files opened on other edge servers do not appear.,
 *                           short - Short output; do not output the revision number or file type.
 *                                   This option is more efficient, particularly when using the -a (all-workspaces)
 *                                   option at large sites.
 *                           changelist - List the files in pending changelist change.
 *                           workspace - List only files that are open in the specified client workspace.
 *                           user - List only those files that were opened by user
 *                           max - List only the first max open files
 * @returns {string}
 */
function optionsToCommand (options) {
  var cmd = ' ';
  for (var key in options) {
    var value = options[key];
    if (key === 'all' && value === true) cmd += '-a ';
    if (key === 'short' && value === true) cmd += '-s ';
    if (key === 'changelist') cmd += '-c ' + value + ' ';
    if (key === 'workspace') cmd += '-C ' + value + ' ';
    if (key === 'user') cmd += '-u ' + value + ' ';
    if (key === 'max') cmd += '-m ' + value + ' ';
  }
  return cmd;
}
