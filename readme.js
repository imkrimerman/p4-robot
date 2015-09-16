#! /usr/local/bin node
var Robot = require('./index')
  , p4 = new Robot();


p4.$after('login', function() {
  p4.client();
  p4.add('file.js');
  p4.opened();
  if (p4.opened('file.js')) {
    console.log('Added File to Perforce'); //TODO: remove console.log
  }
});


