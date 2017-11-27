var config = require('../config');
var express = require('express');
var router = express.Router();
var request = require('request');
var User = require('../models/User.js');

router.get('/add', function(req, res, next) {
  
    var user = req.user;
    var media_id = req.query.media_id;
    var media_type = req.query.media_type;

    // Check if user is logged in
    if (!user) {
      return res.redirect('/login')
    }

    // Check if a media_id and media type exists
    if (media_id && media_type) {

      // Check if user has already saved this media
      // and then save it here in the media var if they have
      var media;

      if (media_type === "movie") {

        media = user.movies.filter(function(movie) {
          return movie.id === media_id
        })[0]

      } else {

        media = user.tv_shows.filter(function(tv_show) {
          return tv_show.id === media_id
        })[0]

      }

      if (media) {
        // if true then user already has that movie saved,
        // so check if he has it set as a facourite
        if (media.isFavourite) {
          // redirect
          return res.redirect('/');
        }

        media.isFavourite = true;

        User.findOneAndUpdate({ 'username': req.user.username }, user, function(err, doc) {
          if (err) {
            console.log(err);
          } else {
            console.log(doc);
          }
        })

      } else {
        // user does not have media saved so get more info about the media
        // from the api as we only have access to the movie id
        var api_options = {
          method: 'GET',
          url: 'https://api.themoviedb.org/3/' + (media_type === "movie" ? "movie/" : "tv/") + media_id,
          qs: { api_key: config.api_key },
          body: '{}' }

          console.log(api_options.url, "mt");
        request(api_options, function (error, response, body) {
          if (error) throw new Error(error);

          var media = JSON.parse(body);
          media.isFavourite = true;
          media.isInWatchlist = false;
          media.hasSeen = false;

          user.movies.push(media);

          // Update db
          User.findOneAndUpdate({ 'username': req.user.username }, user, function(err, doc) {
            if (err) {
              next(err);
            } else {
              res.send('favourite added')
            }
          })

        })

      }

    } else {
      return next(new Error('No media_id or media_type'))
    }
})
module.exports = router;
