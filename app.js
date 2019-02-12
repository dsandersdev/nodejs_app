require('./api/data/dbconnection.js').open();
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./api/routes');

app.set('port', 3000);

// MIDDLEWARE
app.use(function(req, res, next) {
	console.log(req.method, req.url);
	next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routes);

var onlog = function() {
	var port = server.address().port;
	console.log("magic happens on port " + port);
}
var server = app.listen(app.get('port'), onlog);
