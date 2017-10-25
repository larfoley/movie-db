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
      return res.render('pages/register', {error: "User already registered"});
    }

    new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }).save(function(err) {
      if (err) {
        return next(err)

      } else {
        res.render('pages/register', {error: "Thanks for registering"});
      }
    })

  })

});


module.exports = router;
