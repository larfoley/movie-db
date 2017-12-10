var express = require('express');
var router = express.Router();
var rp = require('request-promise');


router.get('/', function(req, res, next) {

  var genres, tvShows;

  rp('http://localhost:3000/api/genres/tv')

    .then(function (response) {
      genres = JSON.parse(response).genres;
      genre = req.query.genre || "";
      sort_by = req.query.sort_by || "";

      return rp('http://localhost:3000/api/tv?genre=' + genre + '&sort_by=' + sort_by)

    })

    .then(function (response) {
      var tvShows = JSON.parse(response);

      if (req.user) {
        tvShows.forEach(function(tv) {
          tv.isFavourite = false;
          tv.isInWatchlist = false;

          for (let i = 0; i < req.user.tv_shows.length; i++) {
            if (req.user.tv_shows[i].id == tv.id ) {
              tv.isFavourite = req.user.tv_shows[i].isFavourite;
              tv.isInWatchlist = req.user.tv_shows[i].isInWatchlist;
              break;
            }
          }
        })
      }

      res.render('pages/tv-shows', {
        page_title: "TV Shows",
        activeLink: "tv-shows",
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
        results: tvShows,
        flash: {
          message: req.flash("message"),
          type: req.flash("type"),
        }
      });
    })

    .catch(function(err) {
      next(err)
    })

});

module.exports = router;
