var config = require('../config');
var express = require('express');
var router = express.Router();
var User = require('../models/User.js');
var request = require('request-promise');

router.get('/', function(req, res, next) {
  if (req.user) {
    // Get favourite movies
    var query = User.findOne({ 'username': req.user.username });
    console.log(1);
    var x = query.exec(function(err, user) {
      console.log(2, err);
      if (err) {
        return next(error);
      }

    })

    console.log(x);
    var movies = [];
    var movieIDS = req.user.favourite.movies.map(function(movie) {
      return movie.id;
    });

    if (movieIDS.length > 0) {

      movieIDS.forEach(function (id, i) {
        var options = {
          method: 'GET',
          url: 'https://api.themoviedb.org/3/movie/' + id,
          qs: { language: 'en-US', api_key: config.api_key },
          body: '{}'
        };

        request(options, function (error, response, body) {
          if (error) throw new Error(error);

          movies.push(JSON.parse(body));

          if (i === movieIDS.length - 1) {
            res.render('pages/dashboard', {
              activeLink: "home",
              isLoggedIn: !!req.user,
              favouriteMovies: movies,
            });
          }
        });
      })

    } else {
      return res.render('pages/dashboard', {
        activeLink: "home",
        isLoggedIn: !!req.user,
        favouriteMovies: movies,
      });
    }


  } else {
    res.redirect('/')
  }

})

module.exports = router;
