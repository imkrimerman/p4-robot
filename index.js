'use strict';
var _ = require('lodash'),
  shell = require('shelljs'),
  fs = require('fs'),
  path = require('path'),
  config = require('./config'),
  lib = require('./lib');
/***************************************************************************
 *
 * Perforce
 *
 **************************************************************************/
module.exports = {

  path: config.paths.p4,

  exists: fs.existsSync(config.paths.p4),

  defaultChangelist: config.defaultChangelist,

  modes: config.modes,

  add: lib.add,

  edit: lib.edit,

  reopen: lib.reopen,

  revert: lib.revert,

  unlock: lib.unlock,

  opened: lib.opened,

  isChmod: lib.chmod,

  exec: lib.exec,

  isOpened: function(filename) {
    filename = path.basename(filename);
    var opened = this.opened();
    for (var key in opened) {
      if (path.basename(opened[key]) === filename) return true;
    }
    return false;
  },



};
