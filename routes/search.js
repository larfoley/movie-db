var express = require('express');
var router = express.Router();
var https = require('https');
var config = require('../config.js');

var request = require("request");

router.post('/', function(req, res, next) {

  var options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/search/multi',
    qs: {
      page: '1',
      language: 'en-US',
      api_key: config.api_key,
      query: req.body.query || ""
    },
    body: '{}'
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.render('pages/search-results', {
      results: JSON.parse(body).results || [],
      username: req.user? req.user.username : null,
      loggedIn: !!req.user
    });
  });
});


module.exports = router;
