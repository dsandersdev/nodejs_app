// THIS REQUIRE READS FILES FROM FILE SYSTEM
var fs = require('fs');

var onfileload = function(err, file) {
	console.log('got the file');
};

console.log('going to get a file');
fs.readFile('readfilesync.js', onfileload);


console.log('app continues');
