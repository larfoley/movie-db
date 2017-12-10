var config = require("../config.js");
var express = require('express');
var router = express.Router();
var request = require("request");

router.get('/', function(req, res, next) {
  var with_genres = req.query.genre;
  var sort_by = req.query.sort_by;

  request(
    { method: 'GET',
      url: 'https://api.themoviedb.org/3/discover/movie',
      qs: { api_key: config.api_key, with_genres: with_genres, sort_by: sort_by },
      body: '{}'
    }, function (error, response, body) {
      if (error) next(error);

      var popularMovies = JSON.parse(body).results;

      if (req.user) {
        // Check if user has movie saved
        // and if so update the response
        popularMovies = popularMovies.map(function(movie, i) {
          movie.isFavourite = false;
          movie.isInWatchlist = false;

          for (let i = 0; i < req.user.movies.length; i++) {
            if (req.user.movies[i].id == movie.id ) {
              movie.isFavourite = req.user.movies[i].isFavourite;
              movie.isInWatchlist = req.user.movies[i].isInWatchlist;
              break;
            }
          }
          return movie;
        })
      }

      res.json(popularMovies);

  });

});



module.exports = router;
