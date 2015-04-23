var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var ObjectId = mongoose.Schema.Types.ObjectId;
var Mixed = mongoose.Schema.Types.Mixed;

var userSchema = mongoose.Schema({
    local            : {
        email        : String,
        password     : String,
    },
    phone: String,
    name: String,
    role: String,
    contacts: [Mixed],
    settings: Mixed
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);