'use strict'
var EventEmitter = require('events').EventEmitter
  , val = require('im.val')
  , extend = require('class-extend').extend
  , _ = require('lodash')
  , BaseEvent = require('./event');
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
 * Alias for EventEmitter 'on' method.
 * @param {String} event
 * @param {Function} cb
 * @returns {EventClass}
 */
function $when (event, cb) {
  if (val(cb) === val.notDefined) return this;
  this.on(event, cb);
  return this;
};

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
   * @param {StringEvent} Event
   * @returns {Object|ChildProcess}
   */
  $fire: function $fire (Event) {
    var isString = _.isString(Event);
    if (! this.__isEvent(Event) && ! isString) return;
    if (isString) Event = new BaseEvent(Event, { data: this });

    this.emit(Event, Event.get('data'));
    return this;
  },

  /**
   * Execute command and fire event with provided Event Emitter.
   * @param {Event} Event - Event object
   * @returns {Object|ChildProcess}
   */
  $exec: function $exec (Event) {
    if (! _.isFunction(this.exec) || ! this.__isEvent(Event))) return;

    var output = this.exec(Event.get('command'), Event.get('execOptions'));
    Event.set('output', output);

    this.$fire(Event);
    return output;
  },

  /**
   * Alias for EventEmitter 'on' method.
   * @param {String|Event} event
   * @param {Function} cb
   * @param {boolean} once
   * @returns {EventClass}
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
   * @returns {EventClass}
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
    return (event instanceof BaseEvent);
  },

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
  Class: Class_,
}
