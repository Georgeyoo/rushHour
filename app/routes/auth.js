var authController = require('../controllers/authcontroller.js');
var db = require("../models");
 
module.exports = function(app, passport) {
    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: 'schedule.html',
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
app.get("/", function(req, res) {
  res.redirect("/signin");
})
// Get request to obtain Appointments table data for insertion to dashboard calendar

    app.get("/api/all", function(req, res) {
         db.appointments.findAll({
            include: [db.user]
         }).then(function(dbPost) {

           // dataConvert(dbPost);
          return res.json(dbPost);
          // res.render("");
        })
    });

    // Post request to create Appointments
    app.post("/appointment/create", function(req, res) {
         db.appointments.create({
            name: req.body.name,
            day: req.body.day,
            time: req.body.time
         }).then(function(dbPost) {

          // return res.json(dbPost);
          res.redirect("/signin");

        })
    });
    
    // routes users vs admins
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated() && req.user.admin == 0) {
            res.redirect('schedule.html');
        } else {
            // res.redirect('/si')
            return next();
        }
    }
}
