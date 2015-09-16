# P4 Robot
### Event driven Perforce module for Node JS

Installation
```
npm install --save p4-robot
```

Usage
```js
var Robot = require('p4-robot')
  , p4 = new Robot();

p4.$after('login', function() {
  p4.add('file.js');
  if (p4.opened('file.js')) {
    console.log('Added File to Perforce');
  }
});
//logs Added File to Perforce

p4.login('mySecretPassword');
```

Available methods:
- add 
- chmod
- client
- edit
- editOrAdd
- exec
- exists
- lock
- login
- logout
- opened
- reopen
- revert
- submit
- sync
- test
- unlock
