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


var UserModel = require('./app/models/user')
var FormModel = require('./app/models/form')
var ResourceModel = require('./app/models/resource')
var BiometricModel = require('./app/models/biometric')
var EventModel = require('./app/models/event')

var configDB = require('./config/database.js');
mongoose.connect(configDB.url, function (err){
	if (err) console.log(err)
	else console.log("Connected to database at ", configDB.url)
});

require('./config/passport')(passport); 

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

app.use(function (req, res, next){
	res.setHeader("Access-Control-Allow-Origin", "*");
	next();
});

var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("Cura Express server listening on port ", port);
});