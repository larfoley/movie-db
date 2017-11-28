var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res, next) {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('pages/login', {
    activeLink: "login",
    isLoggedIn: !!req.user,
  });
});

router.post('/',
  function(req, res, next) {
    if (req.user) {
      return res.redirect('/');
    }
    next()
  },
  passport.authenticate('local'),
  function(req, res) {
    // This only gets called if user is logged in
    console.log('User is logged in');
    return res.redirect(req.user.username + ' is logged in');
  });


module.exports = router;
