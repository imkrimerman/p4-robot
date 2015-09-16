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
 * EventEmitterClass
 * @constructor
 */
function EventEmitterClass () {
  EventEmitter.call(this);
};

/**
 * Extend EventEmitterClass prototype from EventEmitter prototype
 */
_.extend(EventEmitterClass.prototype, EventEmitter.prototype);

/**
 * Inheritance method
 */
Class.extend = EventEmitterClass.extend = extend;


/**
 * Base EventEmitterClass
 */
var EventEmitterClass_ = EventEmitterClass.extend({

  /**
   * EventEmitterClass Constructor.
   * @fires class.bootstrapped
   * @fires class.initialized
   */
  constructor: function EventEmitterClass () {
    EventEmitterClass.call(this);
  },

  /**
   * Fire event.
   * @param {StringEvent} Event
   * @returns {Object|ChildProcess}
   */
  $fire: function $fire (Event) {
    var isString = _.isString(Event);
    if (! this.__isEvent(Event) && ! isString) return;
    if (isString) Event = new EventClass_(Event, { data: this });

    this.emit(Event.event, Event);
    return this;
  },

  /**
   * Execute command and fire event with provided Event Emitter.
   * @param {Event} Event - Event object
   * @returns {Object|ChildProcess}
   */
  $exec: function $exec (Event) {
    if (! _.isFunction(this.exec) || ! this.__isEvent(Event)) return;

    var output = this.exec(Event.get('command'), Event.get('options'));
    Event.set('output', output);

    this.$fire(Event);
    return output;
  },

  /**
   * Alias for EventEmitter 'on' method.
   * @param {String|Event} event
   * @param {Function} cb
   * @param {boolean} once
   * @returns {EventEmitterClass}
   */
  $when: function $when (event, cb, once) {
    if (this.__isEvent(event)) event = event.event;
    if (val(cb) === val.notDefined) return this;
    if (val(once, false)) return this.$after(event, cb);
    this.on(event, cb);
    return this;
  },

  /**
   * Alias for EventEmitter 'once' method.
   * @param {String|Event} event
   * @param {Function} cb
   * @returns {EventEmitterClass}
   */
  $after: function $after (event, cb) {
    if (this.__isEvent(event)) event = event.event;
    if (val(cb) === val.notDefined) return this;
    this.once(event, cb);
    return this;
  },

  /**
   * Checks if event is instance of Event Class
   * @param {*} event
   * @returns {boolean}
   * @private
   */
  __isEvent: function(event) {
    return (event instanceof EventClass_);
  },

});

/**
 * Event Class
 */
var EventClass_ = EventEmitterClass.extend({

  /**
   * Constructs Event
   * @param {String} event
   * @param {Object} object
   * @constructor
   */
  constructor: function(event, object) {
    EventEmitterClass.apply(this);
    this.event = event;
    this.object = this.set(object);
  },

  /**
   * Sets event object
   * @param {Object|String} key
   * @param {*} value
   * @returns {Event}
   */
  set: function (key, value) {
    if (_.isObject(key)) this.object = this.__object(key);
    else _.set(this.object, key, value);
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
   * Checks if Event object has key
   * @param {String} key
   * @returns {*}
   */
  has: function(key) {
    return _.has(this.object, key);
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
      output: undefined,
      data: undefined,
    });
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
 */
module.exports = {
  EventEmitterClass: EventEmitterClass_,
  EventClass: EventClass_,
  Class: Class_,
}
