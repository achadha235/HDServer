var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;
var Mixed = mongoose.Schema.Types.Mixed;

var eventSchema = mongoose.Schema({
    eventType: String,
    time: Date,
    notes: String, 
    createdBy: ObjectId,
    createdFor: ObjectId,
    invited: [Mixed],
    reminder: Boolean,
    repeat: String,
    data: Mixed
 });

module.exports = mongoose.model('Event', eventSchema);