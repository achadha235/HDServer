var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;
var Mixed = mongoose.Schema.Types.Mixed;

var biometricSchema = mongoose.Schema({
    user_name: String,
    heart_rate: String,
    time_recorded: Date,
    time_received: Date,
    breathing_rate: String,
    ecg: String,
    estimated_core_temperature: Number,
    posture: Number
});

module.exports = mongoose.model('Biometric', biometricSchema);