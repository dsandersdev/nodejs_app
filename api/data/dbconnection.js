const MongoClient = require("mongodb").MongoClient;
const assert = require('assert');
const dburl = 'mongodb://localhost:27017';
const dbname = 'meanhotel';
var _conn = null;

var open = function() {
	//WORKING CODE!!!
	// Use connect method to connect to the server
	 MongoClient.connect(dburl, function(err, client) {
	   //assert.equal(null, err);
	   if ( err ) {
		   console.log("error connecting to db!");
		   return;
	   } else {
	     console.log("Connected successfully to server");
	
	       //const db = client.db(dbName);
	       _conn = client.db(dbname);
	       console.log("server info:", _conn);
	
//	         client.close();
	   }
	});
	 // END WORKING CODE!!!!
};

var get = function() {
	return _conn;
};

module.exports = {
	open : open,
	get : get
};
