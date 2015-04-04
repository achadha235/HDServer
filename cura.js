var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var restify = require('express-restify-mongoose')
var passport = require('passport');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var flash    = require('connect-flash');

var configDB = require('./config/database.js');
mongoose.connect(configDB.url, function (err){
	if (err) console.log(err)
	else console.log("Connected to database at ", configDB.url)
});

mongoose.connection.db.dropDatabase();

require('./config/passport')(passport); 

var Form = new Schema({});
var FormModel = mongoose.model('Form', Form);

var Resource = new Schema({});
var ResourceModel = mongoose.model('Resource', Resource);

var Biometric = new Schema({});
var BiometricModel = mongoose.model('Biometric', Biometric);

var Event = new Schema({});
var EventModel = mongoose.model('Event', Event);
var UserModel = require('./app/models/user')

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(express.static('www'));

require('./app/routes.js')(app, passport);

var router = express.Router();
restify.serve(router, FormModel, {
	fullErrors: true, 
	prereq: (function (req){return true}),
	access: (function (req){return 'public'})
});

restify.serve(router, ResourceModel);
restify.serve(router, BiometricModel);
restify.serve(router, EventModel);
restify.serve(router, UserModel);

app.use(router)

app.use(function (req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
});


var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("Cura Express server listening on port ", port);
});