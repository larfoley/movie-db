var config = require('../config');
var express = require('express');
var router = express.Router();
var request = require("request");
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
