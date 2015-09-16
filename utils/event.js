'use strict'
var val = require('im.val')
  , _ = require('lodash')
  , EventClass = require('classes').EventClass;
/***************************************************************************
 *
 * Event Object
 *
 **************************************************************************/
module.exports = EventClass.extend({

  /**
   * Constructs Event
   * @param {String} event
   * @param {Object} object
   * @constructor
   */
  constructor: function(event, object) {
    EventClass.apply(this);
    this.event = event;
    this.object = this.set(object);
  },

  /**
   * Sets event object
   * @param {Object} object
   * @returns {Event}
   */
  set: function (object) {
    this.object = this.__object(object);
    return this;
  },

  /**
   * Return event object
   * @param {String} key
   * @returns {Object|undefined}
   */
  get: function(key) {
    if (val(key, false) && _.has(this.object, key)) {
      return _.get(this.object, key);
    }
    return this.object;
  },

  /**
   * Returns formatted event data object.
   * @param {String} command
   * @param {Object} options
   * @param {*} data
   * @param {Object|ChildProcess} output
   * @returns {Object}
   * @private
   */
  __object: function(options) {
    options = val(options, {}, _.isObject);
    return _.defaults(options, {
      command: {},
      options: {},
      execOptions: {},
      output: undefined,
      data: undefined,
    });
  }
});
