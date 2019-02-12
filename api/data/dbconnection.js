var MongoClient = require("mongodb").MongoClient;
var dburl = 'mongodb://localhost:27017/meanhotel';
var _conn = null;

var open = function() {
	MongoClient.connect(dburl, function(err, db) {
		if ( err ) {
			console.log("DB connection failed");
			return;
		}
		_conn = db;
		console.log("DB connection open", db);
	});
	// set _connection
	
};

var get = function() {
	return _conn;
};

module.exports = {
	open : open,
	get : get
};
