var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;
var Mixed = mongoose.Schema.Types.Mixed;

var resourceSchema = mongoose.Schema({
	type: String,
	resourceUrl: String,
	data: Mixed
});

module.exports = mongoose.model('Resource', resourceSchema);