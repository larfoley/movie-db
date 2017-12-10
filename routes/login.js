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
    username: req.user? req.user.username : null,
    page_title: "Login",
    flash: {
      message: req.flash("message"),
      type: req.flash("type"),
    }
  });
});

router.post('/',function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err)

    if (!user) {
      req.flash("message", "Invalid username or password")
      req.flash("type", "error")
      return res.redirect('/login');
    }

    req.logIn(user, function(err) {
      if (err) { return next(err); }
      req.flash("message", "Logged In")
      req.flash("type", "success")
      return res.redirect('/');
    });
  })(req, res, next);
})


module.exports = router;
