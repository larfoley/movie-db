var express = require('express');
var router = express.Router();
var config = require('../config.js')
var rp = require('request-promise');


router.get('/', function(req, res, next) {

  var genres, tvShows;

  rp('http://localhost:3000/api/genres/movie')

    .then(function (response) {
      genres = JSON.parse(response).genres;
      genre = req.query.genre || "";
      sort_by = req.query.sort_by || "";

      return rp('http://localhost:3000/api/movies?genre=' + genre + '&sort_by=' + sort_by)
    })

    .then(function (response) {
      var movies = JSON.parse(response).results;

      res.render('pages/movies', {
        activeLink: "movies",
        isLoggedIn: !!req.user,
        username: req.user? req.user.username : null,
        requestedGenre: (function() {
          var g = {id: req.query.genre}
          if (genres instanceof Array) {
            var filtered = genres.filter(genre => genre.id == g.id);
            if (filtered.length > 0) {
              g.name = filtered[0].name;
              return g;
            }
          }
          return g;
        }()),
        requestedFilter: (function() {
          var filter = "";

          switch (req.query.sort_by) {
            case "release_date.asc":
              filter = "Latest"
              break;
            case "popularity.desc":
              filter = "Most Popular"
              break;
            case "popularity.asc":
              filter = "Least Popular"
              break;
            default:

          }

          return filter;

        }()),
        genres: genres,
        results: movies
      });
    })

    .catch(function(err) {
      next(err)
    })

});

module.exports = router;
