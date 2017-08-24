var authController = require('../controllers/authcontroller.js');
 
module.exports = function(app, passport) {
    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup'
        }
    ));

    // app.get('/dashboard',authController.dashboard);
    app.get('/dashboard',isLoggedIn, authController.dashboard);
    app.get('/logout',authController.logout);
    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',
        failureRedirect: '/signin'
        }
 
    ));

    // routes users vs admins
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated() && req.user.admin == 0) {
            return next();
        } else {
            res.redirect('/signin');
        }
    }
}