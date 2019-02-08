var express = require('express');
var app = express();
app.set('port', 3000);
var onlog = function() {
	var port = server.address().port;
	console.log("magic happens on port " + port);
}
var server = app.listen(app.get('port'), onlog);
