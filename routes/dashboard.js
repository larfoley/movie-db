var config = require('../config');
var express = require('express');
var router = express.Router();
var User = require('../models/User.js');
var request = require('request');

var movies = [];
var tv = [];
var watchlist = [];

router.get('/', function(req, res, next) {
  res.redirect('/dashboard/favourite');
})

router.get('/favourite', function(req, res, next) {
  if (req.user) {

    var movies = req.user.movies.filter(function(movie) {
      return movie.isFavourite;
    })

    var tv_shows = req.user.movies.filter(function(tv_show) {
      return tv_show.isFavourite;
    })

    res.render("pages/dashboard", {
      "isLoggedIn": !!req.user,
      dashboard_page: 'favourites',
      username: req.user? req.user.username : null,
      "movies": movies,
      "tv_shows": tv_shows,
    })

  } else {
    res.redirect('/login')
  }


})

router.get('/watchlist', function(req, res, next) {
  if (req.user) {

  } else {
    res.redirect('/login')
  }
})



router.get('/recomended', function(req, res, next) {
  var movies = [];
  var tv_shows = [];
  var most_popular_genres = {};

  movies.forEach(function(movie) {
    movie.genres.forEach(function(genre) {
      most_popular_genres[genre.id] += 1;
    })
  })

})

module.exports = router;
