var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');
var bcrypt = require('bcrypt');

router.get('/', function(req, res, next) {
  res.render('pages/register', {activeLink: "register", page_title: "Register"});
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
      return res.render('pages/register', {
        activeLink: "register",
        flash: {
          type: "error",
          message: "That user already exists"
        }
      });
    }

    if (
        req.body.username.trim() === "" ||
        req.body.email.trim() === "" ||
        req.body.password.trim() === ""
      ) {
      return res.render('pages/register', {
        activeLink: "register",
        flash: {
          type: "error",
          message: "required fields are missing"
        }
      });
    }

    if (req.body.password !== req.body.confirm_password) {
      return res.render('pages/register', {
        activeLink: "register",
        flash: {
          type: "error",
          message: "Passwords do not match"
        }
      });
    }

    bcrypt.hash(req.body.password, 10, function(err, hash) {
      if (err) return next(err);

      new User({
        email: req.body.email,
        username: req.body.username,
        password: hash,
        movies: [],
        tv_shows: []
      }).save(function(err) {
        if (err) {
          return next(err)

        } else {
          //User registration is scuccesfull
          res.render('pages/register', {
            activeLink: "register",
            flash: {
              type: "success",
              message: "Thanks for registering"
            }
          });
        }
      })

    });



  })

});


module.exports = router;
