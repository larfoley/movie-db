var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');
var bcrypt = require('bcrypt');

router.get('/', function(req, res, next) {
  res.render('pages/register', {
    activeLink: "register",
    page_title: "Register",
    flash: {
      message: req.flash("message"),
      type: req.flash("type")
    },
  });
});

router.post('/', function(req, res, next) {
  var userRequestIsValid = true;
  if (!mongoose.connection._hasOpened) {
    return next(new Error("unable to connect to db"))
  }
  // check if user exists
  var query = User.findOne({ 'email': req.body.email });

  query.exec(function(err, user) {
    if (err) {
      return next(err)
    }

    if (user) {
      // User already exists
      req.flash('message', 'That user already exists');
      req.flash('type', 'error');
      return res.redirect("/register");
    }

    if (
        req.body.username.trim() === "" ||
        req.body.email.trim() === "" ||
        req.body.password.trim() === ""
      ) {
        req.flash('message', 'Some required field are black');
        req.flash('type', 'error');
      return res.render('pages/register', {
        activeLink: "register"
      });
    }

    if (req.body.password !== req.body.confirm_password) {
      req.flash('message', 'Passwords do not match');
      req.flash('type', 'error');
      return res.render('pages/register', {
        activeLink: "register"
      });
    }

    if (req.body.username.length < 3) {
      req.flash('message', 'username must have at least 3 characters');
      req.flash('type', 'error');
      return res.render('pages/register', {
        activeLink: "register",
      });
    }

    if (req.body.username.length > 10) {
      req.flash('message', 'username can\'t have more that 10 characters');
      req.flash('type', 'error');
      return res.render('pages/register', {
        activeLink: "register",
      });
    }

    if (req.body.password.length < 8) {
      req.flash('message', 'password must be at least 8 characters');
      req.flash('type', 'error');
      return res.render('pages/register', {
        activeLink: "register"
      });
    }

    bcrypt.hash(req.body.password, 10, function(err, hash) {
      if (err) return next(err);

      var user = new User({
        email: req.body.email,
        username: req.body.username,
        password: hash,
        movies: [],
        tv_shows: []
      })

      user.save(function(err) {
        if (err) {
          return next(err)

        } else {
          //User registration is scuccesfull
          req.login(user, function(err) {
            if (err) { return next(err); }
            req.flash('message', 'Logged in')
            return res.redirect("/");
          });

        }
      })

    });



  })

});

module.exports = router;
