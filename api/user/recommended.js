var express = require('express');
var config = require('../../config');
var router = express.Router();
var request = require("request");

router.get('/', function(req, res, next) {
  if (!req.user) res.json({error: "you must be logged in"})

  // Get all of the genres the user likes and convert them to a comma serpated
  // string for the api call
  var with_genres = req.user.most_popular_movie_genres.map(function(genre) {
    return genre.id;
  }).join(',');

  request(
    { method: 'GET',
      url: 'https://api.themoviedb.org/3/discover/movie',
      qs: { with_genres: with_genres, api_key: config.api_key },
      body: '{}'
    }, function (error, response, body) {
        if (error) {
          return next(error);
        }

        // Filter the results so that we are not returning
        // movies the user has already added
        var results = JSON.parse(body).results.filter(function(result) {
          return !req.user.movies.find(function(movie) {
            return movie.id == result.id
          })
        })

        res.json(results);
  });

})

module.exports = router;
