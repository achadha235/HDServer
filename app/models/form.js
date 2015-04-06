var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;
var Mixed = mongoose.Schema.Types.Mixed;

var formSchema = mongoose.Schema({
	userId: ObjectId,
	type: String,
	filledBy: ObjectId,
	data: Mixed
});

module.exports = mongoose.model('Form', formSchema);