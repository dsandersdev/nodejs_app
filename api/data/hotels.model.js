var mongoose = require('mongoose');

// create a schema

var review_schema = new mongoose.Schema({
	name : {
		type : String,
		required : true    
	},
	    stars : {
		type : Number,
		min : 0,
		max : 5, 
		required : true    
	},
    	review : {
		type : String,
    		required : true
	},
    	created_on : {
		type : Date,
    		default : Date.now
	}
});

var room_schema = new mongoose.Schema({
    	type : String,
    	description : String,
    	photos : [String],
    	number : Number,
	price : Number

});

var hotel_schema = new mongoose.Schema({
	name : {
		type : String,
		required : true    
	},
    	stars : {
		type : Number,
		min : 0,
		max : 5, 
		default : 0    
	},
    	services : [String],
    	description : String,
    	photos : [String],
    	currency : String,
    	reviews : [review_schema],
    	rooms : [room_schema],
    	location : {
		address : String,
    		// always store coordinates longiture (e/w), latitude ( n/s )
    		coordinates : {
			type : [Number],
			index : '2dsphere'
		}
	}
});

mongoose.model('Hotel', hotel_schema, 'hotels');

// review schema

