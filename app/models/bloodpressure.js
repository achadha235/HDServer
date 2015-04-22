var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;
var Mixed = mongoose.Schema.Types.Mixed;

var bloodpressureSchema = mongoose.Schema({
	user_name: String,
	systolic: Number,
	dystolic: Number,
	pulse: Number,
	timestamp: Date,
});

module.exports = mongoose.model('Bloodpressure', bloodpressureSchema);