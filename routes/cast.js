var config = require('../config');
var express = require('express');
var router = express.Router();
var https = require('https');
var request = require("request");
var rp = require('request-promise');

router.get('/', function (req, res, next) {
  var id = req.query.id;
  var cast_member;

  rp({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/person/' + id,
      qs: {
        api_key: config.api_key,
        append_to_response: 'movie_credits'
      },
      body: '{}'
    })
    .then(function (response) {
      // Get actors details
      cast_member = JSON.parse(response);
      res.render('pages/cast', {
        cast_member: cast_member,
        page_title: cast_member.name
      })
    })
    .catch(function (err) {
      next(err)
    });
});

module.exports = router;
