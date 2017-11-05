var express = require('express');
var router = express.Router();
var https = require('https');

var request = require("request");

router.post('/', function(req, res, next) {

  var options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/search/multi',
    qs: {
      page: '1',
      language: 'en-US',
      api_key: '87ef8a60645934be3e9195cfbd3f5235',
      query: req.body.query || ""
    },
    body: '{}'
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.render('pages/search-results', {results: JSON.parse(body).results || []});
  });
});


module.exports = router;
