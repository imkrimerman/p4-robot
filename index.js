'use strict';
var _ = require('lodash'),
  lib = require('./lib'),
  config = require('./config');
/***************************************************************************
 *
 * Perforce
 *
 **************************************************************************/
module.exports = _.extend(lib, {

  defaultChangelist: config.defaultChangelist,

  exists: lib.exists,

  modes: config.modes,

});
