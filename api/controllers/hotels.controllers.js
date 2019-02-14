var dbconn = require('../data/dbconnection.js');
var ObjectId = require('mongodb').ObjectId; 
var hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req, res) {



	var db = dbconn.get();
	var collection = db.collection('hotels');

	var offset = 0;
	var count = 5;

	if (req.query && req.query.offset) {
		offset = parseInt(req.query.offset, 10);
	}
	if (req.query && req.query.count) {
		count = parseInt(req.query.count, 10);
	}

	collection	
		.find()
		.skip(offset)
		.limit(count)
		.toArray(function(err, docs) {
			console.log("found hotels", docs);
			res.status(200).json(docs);
		});


};
module.exports.hotelsGetOne = function(req, res) {

	var db = dbconn.get();
	var collection = db.collection('hotels');

	// get url paramter
	var hotelId = req.params.hotelId;
	console.log("Get hotelId", hotelId);

	collection
		.findOne({
				_id : ObjectId(hotelId)
			}, function(err, doc) {
			res
			 .status(200)
			 .json(doc);
		});

};

module.exports.hotelsAddOne = function(req, res) {

	var db = dbconn.get();
	var collection = db.collection('hotels');
	var newHotel;
	console.log("POST new hotel");

	// CEHCK IF EVERYTHING EXIST
	if ( req.body && req.body.name && req.body.stars) {
		newHotel = req.body;
		// make stars param int
		newHotel.stars = parseInt(req.body.stars, 10);
		collection.insertOne(newHotel, function(err, response) {
			console.log(response);
			console.log(response.ops);
			res
			 .status(201)
			 .json(response.ops);
		});
	} else {
		console.log("data is missing from body");
		res.status(400).json({ message: "Required data missing from body" });	
	}
};
