var config = require('../config');
var express = require('express');
var router = express.Router();
var rp = require('request-promise');

router.get('/', function (req, res, next) {
  var id = req.query.id;
  var mediaType = req.query.media_type;
  var media, relatedMedia, cast;

  rp({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/' + mediaType + '/' + id,
      qs: {
        api_key: config.api_key
      },
      body: '{}'
    })
    .then(function (response) {
      media = JSON.parse(response);
      media.isFavourite = false;
      media.isInWatchlist = false;

      if (req.user) {

        if (mediaType === "movie") {

          req.user.movies.forEach(function(movie) {
            if (movie.id == media.id) {
              media.isFavourite = movie.isFavourite;
              media.isInWatchlist = movie.isInWatchlist;
            }
          })
        } else {
          req.user.tv_shows.forEach(function(tv) {
            if (tv.id == media.id) {
              media.isFavourite = tv.isFavourite;
              media.isInWatchlist = tv.isInWatchlist;
            }
          })
        }
      }
      return rp({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/' + mediaType + '/' + id + '/similar',
        qs: {
          api_key: config.api_key,
          language: 'en-US',
          page: '1'
        },
        body: '{}'
      })
    })
    .then(function (response) {
      relatedMedia = JSON.parse(response).results;
      if (req.user) {
        relatedMedia.forEach(function(m) {

          req.user[m.hasOwnProperty("title") ? "movies" : "tv_shows"].forEach(function(um) {
            if (m.id === um.id) {
              m.isFavourite = um.isFavourite;
              m.isInWatchlist = um.isInWatchlist;
            } else {
              m.isFavourite = false;
              m.isInWatchlist = false;
            }
          })
        })
      }
      return rp({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/' + mediaType + '/' + id + '/credits',
        qs: {
          api_key: config.api_key,
        },
        body: '{}'
      })
    })
    .then(function (response) {
      cast = JSON.parse(response).cast;
      res.render('pages/media', {
        mediaType: mediaType,
        isLoggedIn: !!req.user,
        username: req.user? req.user.username : null,
        media: media,
        relatedMedia: relatedMedia,
        cast: cast
      });
    })
    .catch(function (err) {
      next(err)
    });
});

module.exports = router;
