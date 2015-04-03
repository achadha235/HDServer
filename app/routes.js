module.exports = function(app, passport) {

// normal routes ===============================================================

	// PROFILE SECTION =========================
	app.get('/profile', isLoggedIn, function(req, res) {
		res.json(req.user)
	});

	app.get('/notLoggedIn', function (req, res){
		res.json({ error: "You must be logged in to access this resource."})
	})

	// LOGOUT ==============================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/login/success', function (req, res){
		res.json(req.user);
	})

	app.get('/login/failure', function (req, res){
		res.send(400);
		res.end();
	})

	app.get('/register/success', function (req, res){
		res.json(req.user);
	})

	app.get('/register/failure', function (req, res){
		res.send(400);
		res.end();
	})

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

	// locally --------------------------------
		// LOGIN ===============================

		// process the login form
		app.post('/login', passport.authenticate('local-login', {
			successRedirect : '/login/success', // redirect to the secure profile section
			failureRedirect : '/login/failure', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

		// SIGNUP =================================
		// process the signup form
		app.post('/register', passport.authenticate('local-signup', {
			successRedirect : '/register/success', // redirect to the secure profile section
			failureRedirect : '/register/failure', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/notLoggedIn');
}