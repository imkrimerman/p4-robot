'use strict';
var lib = require('./lib'),
  config = require('./config');
/***************************************************************************
 *
 * Perforce
 *
 **************************************************************************/
module.exports = {

  defaultChangelist: config.defaultChangelist,

  exists: lib.exists,

  modes: config.modes,

  add: lib.add,

  edit: lib.edit,

  reopen: lib.reopen,

  revert: lib.revert,

  unlock: lib.unlock,

  opened: lib.opened,

  isChmod: lib.chmod,

  exec: lib.exec,

};
