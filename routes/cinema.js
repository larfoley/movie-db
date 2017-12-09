var config = require('../config');
var express = require('express');
var router = express.Router();
var request = require("request");


router.get('/', function(req, res, next) {

  var options = { method: 'GET',
  url: 'https://api.themoviedb.org/3/movie/now_playing',
  qs: {
    page: '1',
    api_key: config.api_key,
    qs: { region: req.country_code }
  },
  body: '{}' };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    res.render('pages/cinema', {
      activeLink: "cinema",
      isLoggedIn: !!req.user,
      username: req.user? req.user.username : null,
      results: JSON.parse(body).results,
      country: req.country,
      page_title: "Cinema"
    });
  });

});

module.exports = router;
