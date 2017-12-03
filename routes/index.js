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

var options3 = { method: 'GET',
  url: 'https://api.themoviedb.org/3/discover/tv',
  qs: {
    page: '1',
    sort_by: 'popularity.desc',
    language: 'en-US',
    api_key: config.api_key
  },
  body: '{}' };

var options4 = { method: 'GET',
  url: 'https://api.themoviedb.org/3/discover/tv',
  qs:
   { page: '1',
     include_video: 'false',
     include_adult: 'false',
     sort_by: 'primary_release_date.desc',
     language: 'en-US',
     api_key: config.api_key },
  body: '{}' };

router.get('/', function(req, res, next) {

  var popularMovies, latestMovies, popularTvShows, latestTvShows;

  rp(options)
    .then(function (response) {
      // Get popularMovies
      popularMovies = JSON.parse(response).results;

      if (req.user) {

        popularMovies.forEach(function(movie, i) {
          movie.isFavourite = false;
          movie.isInWatchlist = false;

          for (let i = 0; i < req.user.movies.length; i++) {

            if (req.user.movies[i].id == movie.id ) {
              movie.isFavourite = req.user.movies[i].isFavourite;
              movie.isInWatchlist = req.user.movies[i].isInWatchlist;
              break;
            }
          }
        })

      }

      return rp(options2)
    })
    .then(function (response){
      // Get latestMovies
      latestMovies = JSON.parse(response).results;
      if (req.user) {
        latestMovies.forEach(function(movie) {
          movie.isFavourite = false;
          movie.isInWatchlist = false;
          for (let i = 0; i < req.user.movies.length; i++) {
            if (req.user.movies[i].id == movie.id ) {
              movie.isFavourite = req.user.movies[i].isFavourite;
              movie.isInWatchlist = req.user.movies[i].isInWatchlist;
              break;
            }
          }
        })
      }
      return rp(options3)
    })
    .then(function (response) {
      // Get popularTvShows
      popularTvShows = JSON.parse(response).results;
      if (req.user) {

        popularTvShows.forEach(function(tvShow, i) {
          tvShow.isFavourite = false;
          tvShow.isInWatchlist = false;

          for (let i = 0; i < req.user.tv_shows.length; i++) {

            if (req.user.movies[i].id == tvShow.id ) {
              tvShow.isFavourite = req.user.tv_shows[i].isFavourite;
              tvShow.isInWatchlist = req.user.tv_shows[i].isInWatchlist;
              break;
            }
          }
        })
      }
      return rp(options4)
    })
    .then(function (response){
      // Get latestTvShows
      latestTvShows = JSON.parse(response).results;
      if (req.user) {
        latestTvShows.forEach(function(tvShow) {
          tvShow.isFavourite = false;
          tvShow.isInWatchlist = false;
          for (let i = 0; i < req.user.tv_shows.length; i++) {
            if (req.user.movies[i].id == tvShow.id ) {
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
        latestMovies: latestMovies,
        popularTvShows: popularTvShows,
        latestTvShows: latestTvShows
      });
    })
    .catch(function (err) {
      next(err)
    });
});

module.exports = router;
