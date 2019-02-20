var mongoose = require('mongoose');

// create a schema
//
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
    	currency : String
});

mongoose.model('Hotel', hotel_schema, 'hotels');
