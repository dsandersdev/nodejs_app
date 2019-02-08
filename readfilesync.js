// THIS REQUIRE READS FILES FROM FILE SYSTEM
var fs = require('fs');

console.log('going to get a file');
var file = fs.readFileSync('readfilesync.js');


console.log('got the file');
console.log('app continues');
