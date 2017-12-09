var config = require('../config');
var express = require('express');
var router = express.Router();
var rp = require('request-promise');


router.get('/:media_type/:media_id', function (req, res, next) {
  var id = req.params.media_id;
  var media_type = req.params.media_type;
  var media, relatedMedia, cast;

  rp('http://localhost:3000/api/media/' + media_type + "/" + id)
    .then(function (response) {
      media = JSON.parse(response);
      media.isFavourite = false;
      media.isInWatchlist = false;

      if (req.user) {

        if (media_type === "movie") {

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
      return rp('http://localhost:3000/api/media/' + media_type + "/" + id + "/similar")
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
      return rp('http://localhost:3000/api/media/' + media_type + "/" + id + "/credits")
    })
    .then(function (response) {
      cast = JSON.parse(response).cast;
      res.render('pages/media', {
        mediaType: media_type,
        isLoggedIn: !!req.user,
        username: req.user? req.user.username : null,
        media: media,
        relatedMedia: relatedMedia,
        cast: cast,
        page_title: media.title || media.name
      });
    })
    .catch(function (err) {
      next(err)
    });
});

module.exports = router;
