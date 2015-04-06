var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;
var Mixed = mongoose.Schema.Types.Mixed;

var biometricSchema = mongoose.Schema({
    userId: ObjectId,
    timeRecorded: Date,
    timeRecieved: Date,
    heartRate: {
        heart_rate: Number,
        heart_rate_variability: Number
    },
    breathingRate: {
        breathing_rate: Number,
        breathing_wave_amplitude: Number,
        breathing_wave_noise: Number
    },
    ecg: {
        ecg_amplitude: Number,
        ecg_noise: Number
    }, 
    skinTemperature: Number,
    posture: Number
});

module.exports = mongoose.model('Biometric', biometricSchema);