var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;
var Mixed = mongoose.Schema.Types.Mixed;

var bloodoxygenSchema = mongoose.Schema({
	user_name: String,
	blood_oxygen: Number,
	timestamp: Date,
});

module.exports = mongoose.model('Bloodoxygen', bloodoxygenSchema);