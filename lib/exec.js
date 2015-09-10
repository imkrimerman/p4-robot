'use strict'

module.exports = function(cmd, silent) {
  if (this.p4Exists) {
    return shell.execute('p4 ' + cmd, silent);
  }
  writer.error('You don\'t have Perforce Command Line Tools');
  console.log('Install from: ', writer.write('http://www.perforce.com/downloads/complete_list', [
    'underline',
    'blue'
  ]));
};
