'use strict'
var EventEmitter = require('events').EventEmitter
  , val = require('im.val')
  , extend = require('class-extend').extend
  , _ = require('lodash');
/***************************************************************************
 *
 * Classes
 *
 **************************************************************************/
/**
 * Class
 * @constructor
 */
function Class () {};

/**
 * EventClass
 * @constructor
 */
function EventClass () {
  EventEmitter.call(this);
};

/**
 * Extend EventClass prototype from EventEmitter prototype
 */
_.extend(EventClass.prototype, EventEmitter.prototype);

/**
 * Inheritance method
 */
Class.extend = EventClass.extend = extend;

/**
 * Base EventClass
 */
var EventClass_ = EventClass.extend({

  /**
   * EventClass Constructor.
   * @fires class.bootstrapped
   * @fires class.initialized
   */
  constructor: function EventClass () {
    EventClass.call(this);
  },

  /**
   * Fire event with provided Event Emitter.
   * @param {EventEmitter} emitter
   * @param {String} event
   * @param {*} data
   * @returns {undefined}
   */
  $$fire: function(event, data) {
    if (! _.isString(event)) return;
    if (val(data) === val.notDefined) data = this;
    this.emit(event, data);
  }
});

/**
 * Class
 */
var Class_ = Class.extend({

  /**
   * Class Constructor.
   * @fires class.bootstrapped
   * @fires class.initialized
   */
  constructor: function Class () {
    Class.call(this);
  }
});

/**
 * Export Classes
 * @type {{BaseClass: Object, Class: Class}}
 */
module.exports = {
  EventClass: EventClass_,
  Class: Class_
}
