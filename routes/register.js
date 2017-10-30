var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');

router.get('/', function(req, res, next) {
  res.render('pages/register', {activeLink: "register"});
});

router.post('/', function(req, res, next) {
  var userRequestIsValid = true;

  // check if user exists
  var query = User.findOne({ 'email': req.body.email });

  query.exec(function(err, user) {
    if (err) {
      return next(err)
    }

    if (user) {
      // User alread exists
      return res.render('pages/register', {
        activeLink: "register",
        flash: {
          type: "error",
          message: "That user already exists"
        }
      });
    }

    new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
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

  })

});


module.exports = router;
