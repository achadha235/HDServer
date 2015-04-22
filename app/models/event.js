var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;
var Mixed = mongoose.Schema.Types.Mixed;

var eventSchema = mongoose.Schema({
    type: String,
    time: Date,
    description: String,
    createdBy: ObjectId,
    createdFor: ObjectId,
    users: [ObjectId]
});

module.exports = mongoose.model('Event', eventSchema);