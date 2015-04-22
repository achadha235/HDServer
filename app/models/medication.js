var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;
var Mixed = mongoose.Schema.Types.Mixed;

var medicationSchema = mongoose.Schema({
    patient: ObjectId,
    createdBy: ObjectId,
    instructions: String,
    schedule: String,
    drugName: String,
    drugDetails: Mixed
});

module.exports = mongoose.model('Medication', medicationSchema);