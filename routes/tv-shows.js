var express = require('express');
var router = express.Router();
var config = require('../config.js')
var request = require("request");
var rp = require('request-promise');


router.get('/', function(req, res, next) {
  console.log(req.user);
  var genres, tvShows;

  rp({
    method: 'GET',
    url: 'https://api.themoviedb.org/3/genre/tv/list',
    qs: {
      language: 'en-US',
      api_key: config.api_key
    },
    body: '{}'})

    .then(function (response) {

      genres = JSON.parse(response).genres;

      return rp({ method: 'GET',
      url: 'https://api.themoviedb.org/3/discover/tv',
      qs: {
        language: 'en-US',
        api_key: config.api_key,
        with_genres: req.query.genre || null,
        sort_by: req.query.sort_by || null
      },
      body: '{}' })


    })

    .then(function (response) {
      var tvShows = JSON.parse(response).results;
      console.log(tvShows[0]);
      res.render('pages/tv-shows', {
        activeLink: "login",
        isLoggedIn: !!req.user,
        requestedGenre: genres instanceof Array ?
          genres.filter(genre => genre.id == req.query.genre).name : "",
        requestedFilter: req.query.sort_by,
        genres: genres,
        results: tvShows
      });
    })

    .catch(function(err) {
      next(err)
    })

});

module.exports = router;
