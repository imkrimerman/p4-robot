'use strict'
/***************************************************************************
 *
 * Configuration
 *
 **************************************************************************/
module.exports = {

  /**
   * Paths
   */
  paths: {

    /**
     * Perforce command line tools default executable path
     */
    p4: '/usr/local/bin/p4'
  },

  /**
   * Default Perforce changelist that will be used to open files
   */
  defaultChangelist: 'default',

  /**
   * Node JS file modes map
   */
  modes: {
    '33060': 'r',
    '33188': 'rw'
  },

  /**
   * Log debug info to console
   */
  log: {
    debug: true
  },

  /**
   * Shell default execute mode synchronous/asynchronous
   * This config will be used if p4.exec method will be triggered
   * without options
   */
  exec: {
    sync: true, // Or async: true
  },

  /**
   * Command execute settings
   * This object configures shelljs module, that is used to trigger commands
   * @see https://github.com/shelljs/shelljs
   */
  shell: {
    /**
     * Suppresses all command output if true, except for echo() calls. Default is false.
     */
    silent: true,

    /**
     * If true the script will die on errors. Default is false.
     */
    // fatal: false
  }
};
