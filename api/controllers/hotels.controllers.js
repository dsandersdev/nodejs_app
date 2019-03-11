//var dbconn = require('../data/dbconnection.js');
//var ObjectId = require('mongodb').ObjectId; 
//var hotelData = require('../data/hotel-data.json');

var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var runGeoQuery = function(req, res) {
	
	var lng = parseFloat(req.query.lng);
	var lat = parseFloat(req.query.lat);

	// a geoJson point
	var point = {
		type : "Point",
		coordinates : [lng, lat]
	};
	
	var geoOptions = {
		spherical : true,
		maxDistance : 2000,	// meters
		num : 5			//records to return	
	};

	Hotel
		.geoNear(point, geoOptions, function(err, results, stats) {
			console.log("Geo results", results);
			console.log("Geo stats", stats);
			res
				.status(200)
				.json(results);
		});

};

module.exports.hotelsGetAll = function(req, res) {



//	var db = dbconn.get();
//	var collection = db.collection('hotels');

	var offset = 0;
	var count = 5;
	var max_count = 10;

	// check if query string object exists for long and lat
	if (req.query && req.query.lat && req.query.lng) {
		runGeoQuery(req, res);
		return;
	}
	// else run code below
	//
	if (req.query && req.query.offset) {
		offset = parseInt(req.query.offset, 10);
	}
	if (req.query && req.query.count) {
		count = parseInt(req.query.count, 10);
	}

	// validate parameters
	if ( isNaN(offset) || isNaN(count) ) {
		// 400 status code is for error!
		res.status(400).json({
			"message" : "If supplied in querystring count and offset should be integer"
		});
		return;
	}

	if ( count > max_count ) {
		res
		  .status(400)
		  . json({
			"message" : "Count limit of " + max_count + " exceeded" 
		  });
		 return;
	}
	// mongoose way
	Hotel
		.find()
		.skip(offset)
		.limit(count)
		.exec(function(err, hotels) {
			if ( err ) {
				console.log("Error finding hotels");
				res
					.status(500)
					.json(err); 
			} else {
				console.log('Found hotels',hotels.length);
				res.json(hotels);
			}
		});

	// original way
/*
 	collection	
		.find()
		.skip(offset)
		.limit(count)
		.toArray(function(err, docs) {
			console.log("found hotels", docs);
			res.status(200).json(docs);
		});
*/

};
module.exports.hotelsGetOne = function(req, res) {

	//var db = dbconn.get();
	//var collection = db.collection('hotels');

	// get url paramter
	var hotelId = req.params.hotelId;
	console.log("Get hotelId", hotelId);

	Hotel
		.findById(hotelId)
		.exec(function(err, doc) {
			var response = {
				status : 200,
				message : doc
			};
			if ( err ) {
				console.log("Error finding hotel");
				response.status = 500;
				response.message = err;
			} else if ( !doc ) {
				// status code 404 is not found
				    response.status = 404;
				    response.message = {
					"message" : "Hotel ID not found."		
				    };
			}
				res
				 .status(response.status)
				 .json(response.message);
		});

};

// helper function to split array correctly
var _splitArray = function(input) {
	var output;
	if ( input && input.length > 0 ) {
		output = input.split(";");
	} else {
		output = [];
	}
	return output;
};

module.exports.hotelsAddOne = function(req, res) {
	
	Hotel
		.create({
			name: req.body.name,
			description : req.body.description,
			stars : parseInt(req.body.stars, 10),
			services : _splitArray(req.body.services),	
			photos : _splitArray(req.body.photos),	
			currency : req.body.currency,	
			location : {
				address : req.body.address,
				coordinates : [ 
					parseFloat(req.body.lng), 
					parseFloat(req.body.lat) 
				]
			}
		}, function(err, hotel) {
			if ( err ) {
				console.log("Error creating hotel");
				res
					.status(400)
					.json(err);
			} else {
				console.log("Hotel created", hotel);
				res
					// status 201 is when a resource created
					.status(201)
					.json(hotel);
			}
		});
	

};

module.exports.hotelsUpdateOne = function(req, res) {
		var hotelId = req.params.hotelId;
	console.log("Get hotelId", hotelId);

	Hotel
		.findById(hotelId)
		//exclude the following with select
		.select("-reviews -rooms")
		.exec(function(err, doc) {
			var response = {
				status : 200,
				message : doc
			};
			if ( err ) {
				console.log("Error finding hotel");
				response.status = 500;
				response.message = err;
			} else if ( !doc ) {
				// status code 404 is not found
				    response.status = 404;
				    response.message = {
					"message" : "Hotel ID not found."		
				    };
			}
			if (response.status !== 200 ) {
				res
				 .status(response.status)
				 .json(response.message);
			} else {
				doc.name = req.body.name; 
				doc.description = req.body.description;
				doc.rating = parseInt(req.body.rating, 10);
				doc.services = _splitArray(req.body.services);
				doc.photos = _splitArray(req.body.photos);	
				doc.currency = req.body.currency;	
				doc.location = {
					address : req.body.address,
					coordinates : [ 
						parseFloat(req.body.lng), 
						parseFloat(req.body.lat) 
					]
				};

				doc.save(function(err, hotelUpdated) {
					if(err) {
						res.status(500).json(err);
					} else {
						res.status(204).json();
					}
				});
			}
		});


};







