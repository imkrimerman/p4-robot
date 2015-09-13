'use strict';
var _ = require('lodash'),
  proto = require('./proto'),
  config = require('./config');
/***************************************************************************
 *
 * Perforce
 *
 **************************************************************************/
module.exports = _.extend(proto, {
  config: config,
  defaultChangelist: config.defaultChangelist,
  exists: proto.exists,
  modes: config.modes,
});
