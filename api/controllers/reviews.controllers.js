var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

// Get all reviews for a hotel
module.exports.reviewsGetAll = function(req, res) {
 var hotelId = req.params.hotelId;
        console.log("Get hotelId", hotelId);

        Hotel
                .findById(hotelId)
		.select('reviews')
                .exec(function(err, doc) {
			var response = {
				status : 200,
				message : doc.reviews
			};
			if ( err ) {
				response.status = 500;
				response.message = err;
			} else if ( !doc ) {
				response.message = { 
					"message" : "HotelId is not found."
				}
				response.status = 404;
			}
				console.log("Retured doc", doc);
				res
				 .status(response.status)
				 .json(response.message);
                });

};

// Get single review for a hotel
module.exports.reviewsGetOne = function(req, res) {
 var hotelId = req.params.hotelId;
 var reviewId = req.params.reviewId;

console.log("GET reviewId " + reviewId + " for hotelId " + hotelId);

        Hotel
                .findById(hotelId)
		.select('reviews')
                .exec(function(err, hotel) {
			var response = {
				status : 200,
				message : hotel.reviews.id(reviewId)
			};
			if ( err ) {
				response.status = 500;
				response.message = err;
			} else if ( !doc || !hotelId ) {
				// check if parameters exist
				response.status = 404;
				response.message = { 
					"message" : "HotelId or reviewId not found."
				}
			}
			console.log("Retured hotel", hotel);
                        res
                         .status(response.status)
                         .json(response.message);
                });
};
