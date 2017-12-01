var express = require('express');
var router = express.Router();
var config = require('../config.js')
var request = require("request");
var rp = require('request-promise');


router.get('/', function(req, res, next) {

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

      if (req.user) {
        tvShows.forEach(function(tv) {
          tv.isFavourite = false;
          tv.isInWatchlist = false;

          console.log(req.user.tv_shows);
          for (let i = 0; i < req.user.tv_shows.length; i++) {

            if (req.user.tv_shows[i].id == tv.id ) {
              tv.isFavourite = req.user.tv_shows[i].isFavourite;
              tv.isInWatchlist = req.user.tv_shows[i].isInWatchlist;
              break;
            }
          }
        })
      }

      res.render('pages/tv-shows', {
        activeLink: "tv-shows",
        isLoggedIn: !!req.user,
        username: req.user? req.user.username : null,
        requestedGenre: (function() {
          var g = {id: req.query.genre}
          if (genres instanceof Array) {
            var filtered = genres.filter(genre => genre.id == g.id);
            if (filtered.length > 0) {
              g.name = filtered[0].name;
              return g;
            }
          }
          return g;
        }()),
        requestedFilter: (function() {
          var filter = "";

          switch (req.query.sort_by) {
            case "release_date.gte":
              filter = "Latest"
              break;
            case "popularity.desc":
              filter = "Most Popular"
              break;
            case "popularity.asc":
              filter = "Least Popular"
              break;
            default:
          }

          return filter;

        }()),
        genres: genres,
        results: tvShows
      });
    })

    .catch(function(err) {
      next(err)
    })

});

module.exports = router;
