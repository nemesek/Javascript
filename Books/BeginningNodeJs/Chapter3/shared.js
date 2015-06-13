var foo = require('./foo.js');
console.log('initial something', foo.something);
foo.something = 456;
var bar = require('./bar.js');

