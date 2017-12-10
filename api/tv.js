var config = require("../config.js");
var express = require('express');
var router = express.Router();
var request = require("request");

router.get('/', function(req, res, next) {
  var with_genres = req.query.genre;
  var sort_by = req.query.sort_by;
  var options = { method: 'GET',
    url: 'https://api.themoviedb.org/3/discover/tv',
    qs: { api_key: config.api_key},
    body: '{}'
  }

  if (with_genres) {
    options.qs.with_genres = with_genres;
  }

  if (sort_by) {
    options.qs.sort_by = sort_by;
  }


  request(options, function (error, response, body) {
      if (error) next(error);

      popularTvShows = JSON.parse(body).results;

      if (req.user) {
        // Check if user has tv show saved
        // and if so update the response
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

      res.json(popularTvShows);
  });

});



module.exports = router;
