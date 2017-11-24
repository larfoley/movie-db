var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res, next) {
  if (req.user) {
    res.redirect('/');
  }
  res.render('pages/login', {
    activeLink: "login",
    isLoggedIn: !!req.user,
  });
});

router.post('/',
  function(req, res, next) {
    console.log(req.body);
    next()
  },
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    console.log("User is logged in");
    res.redirect('/');
  });


module.exports = router;
