var config = require('../config');
var express = require('express');
var router = express.Router();
var https = require('https');
var request = require("request");
var rp = require('request-promise');

var options = { method: 'GET',
  url: 'https://api.themoviedb.org/3/discover/movie',
  qs: {
    page: '1',
    sort_by: 'popularity.desc',
    language: 'en-US',
    api_key: config.api_key
  },
  body: '{}' };

var options2 = { method: 'GET',
  url: 'https://api.themoviedb.org/3/discover/movie',
  qs:
   { page: '1',
     include_video: 'false',
     include_adult: 'false',
     sort_by: 'primary_release_date.desc',
     language: 'en-US',
     api_key: config.api_key },
  body: '{}' };



router.get('/', function(req, res, next) {

  var popularMovies, latestMovies;

  rp(options)
    .then(function (response) {
      // Get popularMovies
      popularMovies = JSON.parse(response).results;
      return rp(options2)
    })
    .then(function (response) {
      // Get latestMovies
      latestMovies = JSON.parse(response).results;

      res.render('pages/index', {
        activeLink: "home",
        isLoggedIn: !!req.user,
        popularMovies: popularMovies,
        latestMovies: latestMovies
      });
    })
    .catch(function (err) {
      next(err)
    });
});

module.exports = router;
