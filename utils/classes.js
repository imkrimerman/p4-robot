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
   * Fire event.
   * @param {String} event
   * @param {*|undefined} data
   * @returns {Object|ChildProcess}
   */
  $$fire: function(event, data) {
    if (! _.isString(event)) return;
    if (val(data) === val.notDefined) data = this;
    this.emit(event, data);
  },

  /**
   * Execute command and fire event with provided Event Emitter.
   * @param {String} command - Execute command
   * @param {Object} options - Execute command options
   * @param {String} event - Event name 'add'
   * @param {*|undefined} data - Data to fire event with
   * @returns {Object|ChildProcess}
   */
  $$exec: function(command, options, event, data) {
    if (! _.isFunction(this.exec) || _.isString(command)) return;

    options = val(options, {}, _.isObject);
    var output = this.exec(command, options);

    data = { command: command, options: options, data: data, output: null };
    data.output = output;

    this.$$fire(event, data);
    return output;
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
