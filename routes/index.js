var config = require('../config');
var express = require('express');
var router = express.Router();
var https = require('https');
var rp = require('request-promise');


router.get('/', function(req, res, next) {

  var popularMovies, popularTvShows;

  rp('http://localhost:3000/api/movies')
    .then(function (response) {
      // Get popularMovies
      popularMovies = JSON.parse(response).results;

      if (req.user) {

        popularMovies.forEach(function(movie, i) {
          movie.isFavourite = false;
          movie.isInWatchlist = false;

          for (let i = 0; i < req.user.movies.length; i++) {

            // if (req.user.movies[i].id == movie.id ) {
            //   movie.isFavourite = req.user.movies[i].isFavourite;
            //   movie.isInWatchlist = req.user.movies[i].isInWatchlist;
            //   break;
            // }
          }
        })

      }

      return rp('http://localhost:3000/api/tv')
    })
    .then(function (response) {
      // Get popularTvShows
      popularTvShows = JSON.parse(response).results;

      if (req.user) {

        popularTvShows.forEach(function(tvShow, i) {
          tvShow.isFavourite = false;
          tvShow.isInWatchlist = false;

          for (let i = 0; i < req.user.tv_shows.length; i++) {
            if (req.user.tv_shows[i].id == tvShow.id ) {
              tvShow.isFavourite = req.user.tv_shows[i].isFavourite;
              tvShow.isInWatchlist = req.user.tv_shows[i].isInWatchlist;
              break;
            }
          }
        })
      }
      res.render('pages/index', {
        activeLink: "home",
        isLoggedIn: !!req.user,
        username: req.user? req.user.username : null,
        popularMovies: popularMovies,
        popularTvShows: popularTvShows
      });
    })
    .catch(function (err) {
      next(err)
    });
});

module.exports = router;
