var config = require('../config');
var express = require('express');
var router = express.Router();
var https = require('https');
var request = require("request");
var rp = require('request-promise');

router.get('/', function (req, res, next) {
  var id = req.query.id;
  var mediaType = req.query.media_type;
  var media, relatedMedia;
  console.log("MEDIA TYPE", mediaType);

  rp({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/' + mediaType + '/' + id,
      qs: {
        api_key: config.api_key
      },
      body: '{}'
    })
    .then(function (response) {
      // Get selectedMovie
      media = JSON.parse(response);
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
      // Get latestMovies
      relatedMedia = JSON.parse(response).results;
      res.render('pages/media', {
        mediaType: mediaType,
        media: media,
        relatedMovies: relatedMedia
      });
    })
    .catch(function (err) {
      next(err)
    });
});

module.exports = router;
